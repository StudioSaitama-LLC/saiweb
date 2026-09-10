#!/usr/bin/env node
// Measurement and proposals only: this program cannot edit content or deploy.
import {readFile, open, rename, unlink, realpath, mkdir} from 'node:fs/promises';
import {resolve, dirname, relative, isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash, createSign, randomUUID} from 'node:crypto';

export const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API = 'https://www.googleapis.com/webmasters/v3/sites';
const DAY = 86400000;
const ROW_LIMIT = 25000;
const MAX_PAGES = 4;
const STATUSES = new Set(['active', 'reviewing', 'awaiting_deploy', 'observing', 'achieved', 'paused']);
class Blocked extends Error {
  constructor(code, phase = 'configuration', httpStatus) {
    super(code);
    this.code = code;
    this.phase = phase;
    this.httpStatus = httpStatus;
  }
}
const fail = (code, phase, status) => { throw new Blocked(code, phase, status); };
const sha = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const isDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;
export const dateShift = (s, days) => new Date(Date.parse(`${s}T00:00:00Z`) + days * DAY).toISOString().slice(0, 10);
export function pacificDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(now);
  const part = name => parts.find(p => p.type === name).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function windowsFor(now = new Date()) {
  const end = dateShift(pacificDate(now), -3);
  return {
    current28: {startDate: dateShift(end, -27), endDate: end},
    previous28: {startDate: dateShift(end, -55), endDate: dateShift(end, -28)},
    current7: {startDate: dateShift(end, -6), endDate: end},
  };
}
function datesIn(window) {
  const days = [];
  for (let d = window.startDate; d <= window.endDate; d = dateShift(d, 1)) days.push(d);
  return days;
}
export function validateSite(site) {
  const origin = new URL(site.origin);
  if (site.schemaVersion !== 1 || origin.protocol !== 'https:' || origin.origin !== site.origin || origin.username || origin.password || origin.port) fail('invalid_site');
  const permitted = [`sc-domain:${origin.hostname}`, `${origin.origin}/`];
  if (!Array.isArray(site.properties) || !site.properties.length || site.properties.some(p => !permitted.includes(p))) fail('invalid_property_allowlist');
  if (!Array.isArray(site.filters) || site.filters.some(f => !['country', 'device'].includes(f.dimension) || f.operator !== 'equals' || typeof f.expression !== 'string' || !f.expression)) fail('invalid_filters');
  if (!Number.isInteger(site.minImpressions28) || site.minImpressions28 < 1) fail('invalid_minimum');
  if (!Array.isArray(site.allowedPaths) || !Array.isArray(site.allowedPathPrefixes) || ![...site.allowedPaths, ...site.allowedPathPrefixes].every(p => typeof p === 'string' && p.startsWith('/') && !p.startsWith('//'))) fail('invalid_page_scope');
  return site;
}
export function pageURL(target, site) {
  const u = new URL(target, `${site.origin}/`);
  if (u.origin !== site.origin || u.username || u.password || u.search || u.hash) fail('page_outside_scope');
  // Treat trailing slash aliases as one lock; do not change published canonical URLs.
  return `${u.origin}${u.pathname.replace(/\/+$/, '') || '/'}`;
}
function allowedPage(target, site) {
  try {
    const path = new URL(pageURL(target, site)).pathname;
    return site.allowedPaths.includes(path) || site.allowedPathPrefixes.some(prefix => path.startsWith(prefix));
  } catch { return false; }
}
async function stateFrom(repo, env) {
  const templates = resolve(repo, 'data/seo');
  if (env.SEO_STATE_DIR && !isAbsolute(env.SEO_STATE_DIR)) fail('state_directory_requires_absolute_path');
  const directory = resolve(env.SEO_STATE_DIR || resolve(repo, '.local/seo'));
  const rel = relative(resolve(repo), directory);
  const inside = rel === '' || (rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel));
  if (inside && rel !== '.local/seo' && !rel.startsWith('.local/seo/')) fail('state_directory_must_be_private');
  try {
    const runtime = async name => {
      try { return await json(resolve(directory, name)); }
      catch (e) { if (e.code === 'ENOENT') return json(resolve(templates, name)); throw e; }
    };
    const [site, watchwords, history, log] = await Promise.all([json(resolve(templates, 'site.json')), ...['watchwords.json', 'rank-history.json', 'improvement-log.json'].map(runtime)]);
    validateSite(site);
    if (![watchwords, history, log].every(s => s.schemaVersion === 1) || !Array.isArray(watchwords.keywords) || !Array.isArray(history.snapshots) || !Array.isArray(log.improvements)) fail('invalid_state');
    const seen = new Set();
    for (const word of watchwords.keywords) {
      const key = `${word.keyword}\0${pageURL(word.targetPath, site)}`;
      if (typeof word.keyword !== 'string' || !word.keyword.trim() || !Number.isInteger(word.businessPriority) || word.businessPriority < 1 || word.businessPriority > 5 || !STATUSES.has(word.status) || !allowedPage(word.targetPath, site) || seen.has(key)) fail('invalid_watchword');
      seen.add(key);
    }
    for (const action of log.improvements) {
      if (!STATUSES.has(action.status) || typeof action.targetPath !== 'string') fail('invalid_improvement');
      pageURL(action.targetPath, site);
      if (action.affectedPaths !== undefined && (!Array.isArray(action.affectedPaths) || action.affectedPaths.some(p => typeof p !== 'string'))) fail('invalid_affected_paths');
      for (const path of action.affectedPaths ?? []) pageURL(path, site);
      if (action.status === 'observing' && (!isDate(action.liveVerifiedDate) || !action.baselineSnapshotId || !action.deployedSha || !action.liveEvidence)) fail('invalid_observation_evidence');
    }
    return {directory, site, watchwords, history, log};
  } catch (e) {
    if (e instanceof Blocked) throw e;
    fail('invalid_state');
  }
}
export function pageLocks(log, site, watchwords = {keywords: []}) {
  const actions = log.improvements.filter(a => ['reviewing', 'awaiting_deploy', 'observing', 'paused'].includes(a.status));
  const locks = actions.flatMap(a => [...new Set([a.targetPath, ...(a.affectedPaths ?? [])].map(p => pageURL(p, site)))].map(page => ({
    page, status: a.status,
    liveVerifiedDate: a.liveVerifiedDate ?? null,
    nextReviewDate: a.nextReviewDate ?? null,
  })));
  for (const word of watchwords.keywords.filter(w => ['reviewing', 'awaiting_deploy', 'observing'].includes(w.status))) {
    if (!locks.some(l => l.page === pageURL(word.targetPath, site))) locks.push({page: pageURL(word.targetPath, site), status: word.status, reason: 'missing_improvement_record'});
  }
  return locks;
}
function selectionFilters(site) {
  const escaped = site.origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return [{dimension: 'page', operator: 'includingRegex', expression: `^${escaped}(/|$)`}, ...site.filters];
}
async function requestJSON(url, options, fetchImpl, phase) {
  // URLs are constants or property paths constructed below, never credential token_uri.
  let response;
  try { response = await fetchImpl(url, {...options, redirect: 'error', signal: AbortSignal.timeout(30000)}); }
  catch { fail('network_unavailable', phase); }
  if (!response.ok) fail(response.status === 401 ? 'unauthorized' : response.status === 403 ? 'forbidden' : 'http_error', phase, response.status);
  try { return await response.json(); } catch { fail('invalid_google_response', phase); }
}
async function credentialsFrom(path, repo) {
  if (!path) fail('credentials_not_configured', 'authentication');
  if (!isAbsolute(path)) fail('credentials_require_absolute_path', 'authentication');
  try {
    const [file, root] = await Promise.all([realpath(path), realpath(repo)]);
    const rel = relative(root, file);
    if (rel === '' || (rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel))) fail('credentials_must_be_outside_repo', 'authentication');
    const credentials = await json(file);
    const required = credentials.type === 'authorized_user' ? ['client_id', 'client_secret', 'refresh_token'] : credentials.type === 'service_account' ? ['client_email', 'private_key'] : [];
    if (!required.length || required.some(key => typeof credentials[key] !== 'string' || !credentials[key])) fail('invalid_credentials', 'authentication');
    return credentials;
  } catch (e) {
    if (e instanceof Blocked) throw e;
    fail('credentials_unreadable', 'authentication');
  }
}
export async function accessToken(credentials, fetchImpl = fetch, now = new Date()) {
  let form;
  if (credentials.type === 'authorized_user') {
    form = new URLSearchParams({grant_type: 'refresh_token', client_id: credentials.client_id, client_secret: credentials.client_secret, refresh_token: credentials.refresh_token, scope: SCOPE});
  } else {
    try {
      const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
      const iat = Math.floor(now.getTime() / 1000);
      const unsigned = `${encode({alg: 'RS256', typ: 'JWT'})}.${encode({iss: credentials.client_email, scope: SCOPE, aud: TOKEN_URL, iat, exp: iat + 3600})}`;
      const signature = createSign('RSA-SHA256').update(unsigned).sign(credentials.private_key, 'base64url');
      form = new URLSearchParams({grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}`});
    } catch { fail('invalid_service_account_key', 'authentication'); }
  }
  const data = await requestJSON(TOKEN_URL, {method: 'POST', headers: {'content-type': 'application/x-www-form-urlencoded'}, body: form.toString()}, fetchImpl, 'authentication');
  if (typeof data.access_token !== 'string' || !data.access_token) fail('invalid_token_response', 'authentication');
  if (data.scope && !data.scope.split(' ').includes(SCOPE)) fail('readonly_scope_missing', 'authentication');
  return data.access_token;
}
export async function resolveProperty(site, token, fetchImpl = fetch) {
  const data = await requestJSON(API, {headers: {authorization: `Bearer ${token}`}}, fetchImpl, 'property');
  if (data.siteEntry !== undefined && !Array.isArray(data.siteEntry)) fail('invalid_google_response', 'property');
  for (const exact of site.properties) {
    if ((data.siteEntry ?? []).some(p => p.siteUrl === exact && ['siteOwner', 'siteFullUser', 'siteRestrictedUser'].includes(p.permissionLevel))) return exact;
  }
  fail('configured_property_not_accessible', 'property');
}
export async function queryRows(property, token, window, dimensions, filters, fetchImpl = fetch) {
  const rows = [];
  let aggregationType = null;
  for (let page = 0; page < MAX_PAGES; page++) {
    const body = {...window, type: 'web', dataState: 'final', dimensions, aggregationType: 'auto', rowLimit: ROW_LIMIT, startRow: page * ROW_LIMIT};
    if (filters.length) body.dimensionFilterGroups = [{groupType: 'and', filters}];
    const data = await requestJSON(`${API}/${encodeURIComponent(property)}/searchAnalytics/query`, {method: 'POST', headers: {authorization: `Bearer ${token}`, 'content-type': 'application/json'}, body: JSON.stringify(body)}, fetchImpl, 'measurement');
    const part = data.rows ?? [];
    if (!Array.isArray(part) || part.length > ROW_LIMIT || part.some(row => !Array.isArray(row.keys) || row.keys.length !== dimensions.length || !row.keys.every(k => typeof k === 'string') || !['clicks', 'impressions', 'ctr', 'position'].every(k => Number.isFinite(row[k]) && row[k] >= 0))) fail('invalid_google_response', 'measurement');
    rows.push(...part);
    aggregationType = data.responseAggregationType ?? aggregationType;
    if (part.length < ROW_LIMIT) return {rows, aggregationType, truncated: false};
  }
  // Even exactly MAX_PAGES full pages are conservatively treated as truncated.
  return {rows, aggregationType, truncated: true};
}
export async function collectSnapshot(site, property, token, now = new Date(), fetchImpl = fetch) {
  const windows = windowsFor(now);
  const filters = selectionFilters(site);
  const result = {};
  for (const [name, window] of Object.entries(windows)) {
    const queryPage = await queryRows(property, token, window, ['query', 'page'], filters, fetchImpl);
    const page = await queryRows(property, token, window, ['page'], filters, fetchImpl);
    const daily = await queryRows(property, token, window, ['date'], filters, fetchImpl);
    // Google's availability diagnostic intentionally has no filters. Store dates only,
    // not other subdomains' metrics when the selected property is a domain property.
    const available = await queryRows(property, token, window, ['date'], [], fetchImpl);
    const expectedDates = datesIn(window);
    const scopedDates = new Set(daily.rows.map(r => r.keys[0]));
    const propertyDates = new Set(available.rows.map(r => r.keys[0]));
    const missingDates = expectedDates.filter(d => !scopedDates.has(d));
    const propertyMissingDates = expectedDates.filter(d => !propertyDates.has(d));
    const truncated = [queryPage, page, daily, available].some(d => d.truncated);
    for (const dataset of [queryPage, page, daily]) dataset.rows.sort((a, b) => a.keys.join('\0').localeCompare(b.keys.join('\0')));
    result[name] = {...window, queryPage, page, daily, availability: {expectedDates, datesWithScopedData: [...scopedDates].sort(), missingDates, propertyMissingDates, missingDateMeaning: 'unknown_or_no_reported_data_not_zero'}, warnings: missingDates.length || propertyMissingDates.length ? ['missing_daily_rows_not_imputed'] : [], truncated, dataQuality: truncated ? 'truncated' : !daily.rows.length || !available.rows.length || !page.rows.length || !queryPage.rows.length ? 'insufficient_data' : 'usable'};
  }
  const context = {siteId: site.siteId, origin: site.origin, property, type: 'web', dataState: 'final', timezone: 'America/Los_Angeles', filters, windows};
  return {...context, id: sha({context, measurements: result}), collectedAt: now.toISOString(), apiCompleteness: 'top_rows_only_anonymized_queries_omitted', windows: result};
}
function metrics(window, dimension, keys) {
  const row = window?.[dimension]?.rows.find(r => r.keys.length === keys.length && keys.every((v, i) => r.keys[i] === v));
  if (!row || row.impressions <= 0 || !Number.isFinite(row.position) || row.position <= 0) return null;
  return {rank: row.position, clicks: row.clicks, impressions: row.impressions, ctr: row.ctr};
}
function pageMetrics(window, target, site) {
  // Do not silently add together canonical aliases or duplicate page rows.
  const rows = window?.page?.rows.filter(r => {
    try { return pageURL(r.keys[0], site) === pageURL(target, site); } catch { return false; }
  }) ?? [];
  return rows.length === 1 ? metrics(window, 'page', rows[0].keys) : null;
}
function queryMetrics(window, keyword, target, site) {
  const rows = window?.queryPage?.rows.filter(r => {
    try { return r.keys[0] === keyword && pageURL(r.keys[1], site) === pageURL(target, site); } catch { return false; }
  }) ?? [];
  return rows.length === 1 ? metrics(window, 'queryPage', rows[0].keys) : null;
}
function usable(snapshot) {
  return snapshot && Object.values(snapshot.windows).length === 3 && ['current28', 'previous28', 'current7'].every(key => snapshot.windows[key]?.dataQuality === 'usable' && snapshot.windows[key]?.truncated === false);
}
export function reviewReadiness(log, history, snapshot, site, today) {
  return log.improvements.filter(a => ['reviewing', 'awaiting_deploy', 'observing'].includes(a.status)).map(action => {
    const base = {id: action.id ?? null, page: pageURL(action.targetPath, site), status: action.status, transitionApplied: false};
    if (action.status === 'reviewing') return {...base, review: 'implementation_or_review_pending'};
    if (action.status === 'awaiting_deploy') return {...base, review: 'awaiting_live_verification'};
    const elapsed = Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${action.liveVerifiedDate}T00:00:00Z`)) / DAY);
    if (elapsed < 28) return {...base, review: elapsed >= 7 ? 'interim_only' : 'observing', daysSinceLive: elapsed};
    const baseline = history.snapshots.find(s => s.id === action.baselineSnapshotId);
    const pre = pageMetrics(baseline?.windows.current28, action.targetPath, site);
    const post = pageMetrics(snapshot?.windows.current28, action.targetPath, site);
    const comparable = baseline && snapshot && baseline.property === snapshot.property && JSON.stringify(baseline.filters) === JSON.stringify(snapshot.filters) && baseline.windows.current28.endDate < action.liveVerifiedDate && snapshot.windows.current28.startDate >= action.liveVerifiedDate;
    if (!usable(snapshot) || baseline?.windows.current28.dataQuality !== 'usable' || !comparable || !pre || !post || pre.impressions < site.minImpressions28 || post.impressions < site.minImpressions28) return {...base, review: 'insufficient_data_extend_observation', daysSinceLive: elapsed};
    return {...base, review: 'review_required', daysSinceLive: elapsed, before: pre, after: post, interpretation: 'association_only_not_causal_proof'};
  });
}
export function evaluate(state, snapshot, now = new Date()) {
  const {site, watchwords, log, history} = state;
  const locks = pageLocks(log, site, watchwords);
  const locked = new Set(locks.map(l => l.page));
  const reviews = reviewReadiness(log, history, snapshot, site, pacificDate(now));
  if (locks.some(l => l.reason === 'missing_improvement_record')) return {status: 'blocked', reason: 'watchword_without_improvement_record', pageLocks: locks, reviews, candidate: null, proposals: []};
  const latestEnd = windowsFor(now).current28.endDate;
  if (!snapshot || snapshot.siteId !== site.siteId || snapshot.origin !== site.origin || !site.properties.includes(snapshot.property) || JSON.stringify(snapshot.filters) !== JSON.stringify(selectionFilters(site)) || snapshot.windows.current28.endDate !== latestEnd || !usable(snapshot)) return {status: 'insufficient_data', reason: snapshot ? 'incomplete_truncated_stale_or_changed_measurement' : 'no_snapshot', pageLocks: locks, reviews, candidate: null, proposals: []};
  const candidates = [];
  const excluded = [];
  for (const word of watchwords.keywords) {
    const target = pageURL(word.targetPath, site);
    const current = queryMetrics(snapshot.windows.current28, word.keyword, target, site);
    const previous = queryMetrics(snapshot.windows.previous28, word.keyword, target, site);
    let reason = null;
    if (word.status !== 'active') reason = `keyword_${word.status}`;
    else if (locked.has(target)) reason = 'page_locked';
    else if (!allowedPage(target, site)) reason = 'page_outside_scope';
    else if (!current || !previous || current.impressions < site.minImpressions28 || previous.impressions < site.minImpressions28) reason = 'insufficient_data';
    else if (current.rank < 2 || current.rank > 20) reason = 'outside_candidate_rank_band';
    if (reason) excluded.push({keyword: word.keyword, page: target, reason});
    else candidates.push({keyword: word.keyword, page: target, businessPriority: word.businessPriority, current, previous, approval: 'analysis_candidate_only'});
  }
  candidates.sort((a, b) => b.businessPriority - a.businessPriority || Number(a.current.rank > 10) - Number(b.current.rank > 10) || b.current.impressions - a.current.impressions || a.current.rank - b.current.rank || a.keyword.localeCompare(b.keyword));
  const registered = new Set(watchwords.keywords.map(w => `${w.keyword}\0${pageURL(w.targetPath, site)}`));
  const proposals = snapshot.windows.current28.queryPage.rows.filter(r => {
    try { return r.impressions >= site.minImpressions28 && r.position >= 2 && r.position <= 20 && allowedPage(r.keys[1], site) && !locked.has(pageURL(r.keys[1], site)) && !registered.has(`${r.keys[0]}\0${pageURL(r.keys[1], site)}`); } catch { return false; }
  }).slice(0, 10).map(r => ({keyword: r.keys[0], page: r.keys[1], impressions: r.impressions, rank: r.position, businessPriority: null, approval: 'registration_and_priority_required'}));
  return {status: candidates.length ? 'candidate_available' : 'no_candidate', pageLocks: locks, reviews, candidate: candidates[0] ?? null, excluded, proposals};
}
export async function appendSnapshot(file, snapshot) {
  const lockPath = `${file}.lock`;
  let lock;
  let temporary;
  try {
    await mkdir(dirname(file), {recursive: true, mode: 0o700});
    try { lock = await open(lockPath, 'wx', 0o600); } catch (e) { if (e.code === 'EEXIST') fail('history_locked', 'persistence'); throw e; }
    await lock.writeFile(JSON.stringify({pid: process.pid, startedAt: new Date().toISOString()}));
    let prior;
    try { prior = await json(file); }
    catch (e) { if (e.code === 'ENOENT') prior = {schemaVersion: 1, snapshots: []}; else throw e; }
    if (prior.schemaVersion !== 1 || !Array.isArray(prior.snapshots)) fail('invalid_history', 'persistence');
    if (prior.snapshots.some(s => s.id === snapshot.id)) return {appended: false, reason: 'duplicate_snapshot'};
    const next = {...prior, snapshots: [...prior.snapshots, snapshot]};
    temporary = `${file}.${randomUUID()}.tmp`;
    const handle = await open(temporary, 'wx', 0o600);
    try { await handle.writeFile(`${JSON.stringify(next, null, 2)}\n`); await handle.sync(); } finally { await handle.close(); }
    await rename(temporary, file);
    temporary = null;
    return {appended: true, snapshotId: snapshot.id};
  } finally {
    if (temporary) await unlink(temporary).catch(() => {});
    if (lock) { await lock.close(); await unlink(lockPath); }
  }
}
export async function run({repo, command = 'status', append = false, env = process.env, now = new Date(), fetchImpl = fetch}) {
  try {
    if (!['status', 'fetch'].includes(command) || (append && command !== 'fetch')) fail('usage_status_or_fetch_append');
    const state = await stateFrom(repo, env);
    let credentials;
    try { credentials = await credentialsFrom(env.SEO_GSC_CREDENTIALS, repo); }
    catch (e) {
      if (e instanceof Blocked) return {status: 'blocked', reason: e.code, phase: e.phase, siteId: state.site.siteId, historyChanged: false, improvementsChanged: false, pageLocks: pageLocks(state.log, state.site, state.watchwords), candidate: null};
      throw e;
    }
    if (command === 'status') return {status: 'configured_unverified', authentication: 'not_contacted', siteId: state.site.siteId, historyChanged: false, improvementsChanged: false, ...{analysis: evaluate(state, state.history.snapshots.at(-1), now)}};
    const token = await accessToken(credentials, fetchImpl, now);
    const property = await resolveProperty(state.site, token, fetchImpl);
    const snapshot = await collectSnapshot(state.site, property, token, now, fetchImpl);
    const assessment = evaluate(state, snapshot, now);
    const persistence = append ? await appendSnapshot(resolve(state.directory, 'rank-history.json'), snapshot) : {appended: false, reason: 'read_only_fetch'};
    return {status: 'measured', siteId: state.site.siteId, property, snapshotId: snapshot.id, historyChanged: persistence.appended, improvementsChanged: false, persistence, assessment, snapshot: append ? undefined : snapshot};
  } catch (e) {
    // Never print exception messages, Google response bodies, credentials or paths.
    return {status: 'blocked', reason: e instanceof Blocked ? e.code : 'operation_failed', phase: e instanceof Blocked ? e.phase : 'local', ...(e instanceof Blocked && e.httpStatus ? {httpStatus: e.httpStatus} : {}), historyChanged: false, improvementsChanged: false, candidate: null};
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const command = args.shift() ?? 'status';
  let repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  let append = false;
  let invalid = false;
  while (args.length) {
    const arg = args.shift();
    if (arg === '--repo' && args[0] && !args[0].startsWith('--')) repo = resolve(args.shift());
    else if (arg === '--append') append = true;
    else invalid = true;
  }
  const result = invalid ? {status: 'blocked', reason: 'usage_status_or_fetch_append', historyChanged: false} : await run({repo, command, append});
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.status === 'blocked') process.exitCode = 2;
}
