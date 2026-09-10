import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm, access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {generateKeyPairSync, verify} from 'node:crypto';
import {SCOPE, run, windowsFor, dateShift, collectSnapshot, evaluate, appendSnapshot, queryRows, resolveProperty, accessToken} from './seo-watch.mjs';

const NOW = new Date('2026-09-11T09:00:00Z');
const SITE = {schemaVersion: 1, siteId: 'test-site', origin: 'https://example.com', properties: ['sc-domain:example.com', 'https://example.com/'], filters: [], minImpressions28: 30, allowedPaths: ['/'], allowedPathPrefixes: []};
const EMPTY = {schemaVersion: 1, improvements: []};
const row = (keys, impressions = 100, position = 4) => ({keys, impressions, position, clicks: 10, ctr: 10 / impressions});
const ok = data => ({ok: true, status: 200, json: async () => data});
function dates(window) {
  const result = [];
  for (let d = window.startDate; d <= window.endDate; d = dateShift(d, 1)) result.push(d);
  return result;
}
function mockGoogle({empty = false, missingDay = false, errorStatus, capture = []} = {}) {
  return async (url, options) => {
    capture.push({url, options});
    assert.equal(options.redirect, 'error');
    if (url === 'https://oauth2.googleapis.com/token') return errorStatus ? {ok: false, status: errorStatus} : ok({access_token: 'fake-token', scope: SCOPE});
    if (url.endsWith('/sites')) return ok({siteEntry: [{siteUrl: SITE.properties[0], permissionLevel: 'siteRestrictedUser'}]});
    assert.match(url, /^https:\/\/www\.googleapis\.com\/webmasters\/v3\/sites\//);
    const body = JSON.parse(options.body);
    assert.equal(body.type, 'web');
    assert.equal(body.dataState, 'final');
    assert.equal(body.rowLimit, 25000);
    const dimensions = body.dimensions.join(',');
    let rows = dimensions === 'query,page' ? [row(['query A', 'https://example.com/']), row(['query B', 'https://example.com/'])] : dimensions === 'page' ? [row(['https://example.com/'], 200)] : dates(body).map(d => row([d], 10));
    if (missingDay && dimensions === 'date') rows = rows.slice(1);
    return ok({rows: empty ? [] : rows, responseAggregationType: body.dimensionFilterGroups ? 'byPage' : 'byProperty'});
  };
}
const snapshot = (options, now = NOW) => collectSnapshot(SITE, SITE.properties[0], 'fake-token', now, mockGoogle(options));
function state(snap, keywords = [], improvements = []) {
  return {site: SITE, watchwords: {schemaVersion: 1, keywords}, history: {schemaVersion: 1, snapshots: snap ? [snap] : []}, log: {schemaVersion: 1, improvements}};
}
const word = (keyword = 'query B') => ({keyword, targetPath: '/', businessPriority: 5, status: 'active'});
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'seo-watch-test-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const repo = join(root, 'repo');
  const stateDir = join(root, 'private');
  await mkdir(join(repo, 'data/seo'), {recursive: true});
  for (const [name, data] of Object.entries({'site.json': SITE, 'watchwords.json': {schemaVersion: 1, keywords: []}, 'rank-history.json': {schemaVersion: 1, snapshots: []}, 'improvement-log.json': EMPTY})) await writeFile(join(repo, 'data/seo', name), JSON.stringify(data));
  const credentials = join(root, 'credentials.json');
  await writeFile(credentials, JSON.stringify({type: 'authorized_user', client_id: 'test-client', client_secret: 'test-secret', refresh_token: 'test-refresh', token_uri: 'https://attacker.invalid/token'}));
  return {repo, stateDir, env: {SEO_STATE_DIR: stateDir, SEO_GSC_CREDENTIALS: credentials}};
}

test('Pacific windows are inclusive, disjoint 28-day periods with 3-day final-data lag', () => {
  const windows = windowsFor(new Date('2026-09-11T01:00:00Z'));
  assert.deepEqual(windows.current28, {startDate: '2026-08-11', endDate: '2026-09-07'});
  assert.equal(dates(windows.previous28).length, 28);
  assert.equal(dateShift(windows.previous28.endDate, 1), windows.current28.startDate);
  assert.equal(dates(windows.current7).length, 7);
});

test('another keyword on the same observing URL is locked even after review due date', async () => {
  const snap = await snapshot();
  const log = [{id: 'A', keyword: 'query A', targetPath: 'https://example.com/', status: 'observing', liveVerifiedDate: '2026-08-01', nextReviewDate: '2026-08-08', baselineSnapshotId: 'missing'}];
  const result = evaluate(state(snap, [word()], log), snap, NOW);
  assert.equal(result.candidate, null);
  assert.equal(result.excluded[0].reason, 'page_locked');
  assert.equal(result.pageLocks.length, 1);
  assert.equal(result.reviews[0].review, 'insufficient_data_extend_observation');
  assert.equal(log[0].status, 'observing');
});

test('awaiting_deploy locks the full URL before any observation timer begins', async () => {
  const snap = await snapshot();
  const result = evaluate(state(snap, [word()], [{targetPath: '/', status: 'awaiting_deploy'}]), snap, NOW);
  assert.equal(result.excluded[0].reason, 'page_locked');
  assert.equal(result.reviews[0].review, 'awaiting_live_verification');
});

test('7 days is interim only and missing or low-volume data never releases observation', async () => {
  const snap = await snapshot();
  const log = [{targetPath: '/', status: 'observing', liveVerifiedDate: '2026-09-01', baselineSnapshotId: snap.id}];
  const before = JSON.stringify(log);
  assert.equal(evaluate(state(snap, [word()], log), snap, NOW).reviews[0].review, 'interim_only');
  assert.equal(JSON.stringify(log), before);
  log[0].liveVerifiedDate = '2026-06-01';
  const noData = await snapshot({empty: true});
  assert.equal(evaluate(state(snap, [word()], log), noData, NOW).reviews[0].review, 'insufficient_data_extend_observation');
  assert.equal(log[0].status, 'observing');
});

test('unregistered queries are proposals only and no candidate does not change state', async () => {
  const snap = await snapshot();
  const current = state(snap);
  const before = JSON.stringify(current);
  const result = evaluate(current, snap, NOW);
  assert.equal(result.status, 'no_candidate');
  assert.equal(result.candidate, null);
  assert.equal(result.proposals[0].approval, 'registration_and_priority_required');
  assert.equal(JSON.stringify(current), before);
});

test('business priority is required and selected candidate remains a proposal, not edit permission', async () => {
  const snap = await snapshot();
  const result = evaluate(state(snap, [{...word('query A'), businessPriority: 1}, word()]), snap, NOW);
  assert.equal(result.candidate.keyword, 'query B');
  assert.equal(result.candidate.approval, 'analysis_candidate_only');
});

test('individual missing days warn without inventing zero or blocking a measured window', async () => {
  const missing = await snapshot({missingDay: true});
  assert.equal(missing.windows.current28.availability.missingDates.length, 1);
  assert.equal(missing.windows.current28.dataQuality, 'usable');
  assert.deepEqual(missing.windows.current28.warnings, ['missing_daily_rows_not_imputed']);
  assert.equal(evaluate(state(missing, [word()]), missing, NOW).candidate.keyword, 'query B');
  const empty = await snapshot({empty: true});
  assert.deepEqual(empty.windows.current28.page.rows, []);
  assert.equal(evaluate(state(empty, [word()]), empty, NOW).status, 'insufficient_data');
});

test('401, 403 and missing dedicated credentials cannot write history or improvement logs', async t => {
  const {repo, env, stateDir} = await fixture(t);
  const before = await readFile(join(repo, 'data/seo/rank-history.json'), 'utf8');
  for (const errorStatus of [401, 403]) {
    const result = await run({repo, env, command: 'fetch', append: true, now: NOW, fetchImpl: mockGoogle({errorStatus})});
    assert.equal(result.status, 'blocked');
    assert.equal(result.httpStatus, errorStatus);
    assert.equal(result.historyChanged, false);
    assert.doesNotMatch(JSON.stringify(result), /test-secret|test-refresh|fake-token/);
  }
  const noCredentials = await run({repo, env: {SEO_STATE_DIR: stateDir}, command: 'fetch', append: true, fetchImpl: () => assert.fail('network must not be called')});
  assert.equal(noCredentials.reason, 'credentials_not_configured');
  assert.equal(await readFile(join(repo, 'data/seo/rank-history.json'), 'utf8'), before);
  await assert.rejects(access(stateDir), {code: 'ENOENT'});
});

test('history preserves previous records, identical IDs deduplicate and lock rejects concurrency', async t => {
  const {stateDir} = await fixture(t);
  const file = join(stateDir, 'rank-history.json');
  const first = {id: 'one', immutable: {value: 1}};
  assert.equal((await appendSnapshot(file, first)).appended, true);
  assert.equal((await appendSnapshot(file, {...first, immutable: {value: 2}})).appended, false);
  await appendSnapshot(file, {id: 'two'});
  assert.deepEqual(JSON.parse(await readFile(file, 'utf8')).snapshots, [first, {id: 'two'}]);
  await writeFile(`${file}.lock`, 'existing-writer');
  await assert.rejects(appendSnapshot(file, {id: 'three'}), /history_locked/);
  assert.equal(await readFile(`${file}.lock`, 'utf8'), 'existing-writer');
});

test('corrected measurements in the same date window append separately; identical content deduplicates', async t => {
  const {stateDir} = await fixture(t);
  const file = join(stateDir, 'rank-history.json');
  const empty = await snapshot({empty: true});
  const corrected = await snapshot();
  const identical = await snapshot();
  assert.notEqual(empty.id, corrected.id);
  assert.equal(corrected.id, identical.id);
  await appendSnapshot(file, empty);
  await appendSnapshot(file, corrected);
  assert.equal((await appendSnapshot(file, identical)).appended, false);
  const saved = JSON.parse(await readFile(file, 'utf8')).snapshots;
  assert.equal(saved.length, 2);
  assert.deepEqual(saved[0], empty);
});

test('reviewing locks all affected URLs and inconsistent watching state fails closed', async () => {
  const snap = await snapshot();
  const multi = [{targetPath: '/other', affectedPaths: ['/'], status: 'reviewing'}];
  const result = evaluate(state(snap, [word()], multi), snap, NOW);
  assert.equal(result.pageLocks.length, 2);
  assert.equal(result.excluded[0].reason, 'page_locked');
  const inconsistent = evaluate(state(snap, [{...word('query A'), status: 'observing'}, word()]), snap, NOW);
  assert.equal(inconsistent.status, 'blocked');
  assert.equal(inconsistent.reason, 'watchword_without_improvement_record');
  assert.equal(inconsistent.candidate, null);
});

test('successful append writes only private state and never the tracked public template', async t => {
  const {repo, env, stateDir} = await fixture(t);
  const capture = [];
  const result = await run({repo, env, command: 'fetch', append: true, now: NOW, fetchImpl: mockGoogle({capture})});
  assert.equal(result.status, 'measured');
  assert.equal(result.historyChanged, true);
  assert.equal(JSON.parse(await readFile(join(repo, 'data/seo/rank-history.json'), 'utf8')).snapshots.length, 0);
  assert.equal(JSON.parse(await readFile(join(stateDir, 'rank-history.json'), 'utf8')).snapshots.length, 1);
  assert.ok(capture.every(c => !c.url.includes('attacker')));
  const again = await run({repo, env, command: 'fetch', append: true, now: NOW, fetchImpl: mockGoogle()});
  assert.equal(again.persistence.reason, 'duplicate_snapshot');
  const unsafe = await run({repo, env: {...env, SEO_STATE_DIR: join(repo, 'data/seo')}, command: 'fetch', append: true});
  assert.equal(unsafe.reason, 'state_directory_must_be_private');
});

test('status is read-only and does not claim live authentication from a credentials file', async t => {
  const {repo, env, stateDir} = await fixture(t);
  const result = await run({repo, env, fetchImpl: () => assert.fail('status must not call Google')});
  assert.equal(result.status, 'configured_unverified');
  assert.equal(result.authentication, 'not_contacted');
  await assert.rejects(access(stateDir), {code: 'ENOENT'});
});

test('property resolver refuses an accessible property from another domain', async () => {
  await assert.rejects(resolveProperty(SITE, 'fake-token', async () => ok({siteEntry: [{siteUrl: 'sc-domain:other.example', permissionLevel: 'siteOwner'}]})), /configured_property_not_accessible/);
});

test('bounded pagination marks full cap as truncated and suppresses candidates', async () => {
  let count = 0;
  const result = await queryRows(SITE.properties[0], 'fake-token', windowsFor(NOW).current7, ['page'], [], async () => {
    count++;
    return ok({rows: Array.from({length: 25000}, (_, i) => row([`https://example.com/${count}-${i}`]))});
  });
  assert.equal(count, 4);
  assert.equal(result.truncated, true);
  const snap = await snapshot();
  snap.windows.current28.truncated = true;
  assert.equal(evaluate(state(snap, [word()]), snap, NOW).candidate, null);
});

test('service account signs a valid JWT for only the fixed Google token endpoint and readonly scope', async () => {
  const {privateKey, publicKey} = generateKeyPairSync('rsa', {modulusLength: 2048});
  const credentials = {type: 'service_account', client_email: 'test@example.iam.gserviceaccount.com', private_key: privateKey.export({type: 'pkcs8', format: 'pem'}), token_uri: 'https://attacker.invalid'};
  const token = await accessToken(credentials, async (url, options) => {
    assert.equal(url, 'https://oauth2.googleapis.com/token');
    const form = new URLSearchParams(options.body);
    const [header, payload, signature] = form.get('assertion').split('.');
    const claims = JSON.parse(Buffer.from(payload, 'base64url'));
    assert.equal(claims.scope, SCOPE);
    assert.equal(claims.aud, url);
    assert.equal(claims.exp - claims.iat, 3600);
    assert.equal(verify('RSA-SHA256', Buffer.from(`${header}.${payload}`), publicKey, Buffer.from(signature, 'base64url')), true);
    return ok({access_token: 'fake-token'});
  }, NOW);
  assert.equal(token, 'fake-token');
});
