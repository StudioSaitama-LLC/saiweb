"use client"

import { useState, useEffect, useRef } from "react"
import { works, ALL_CATEGORIES, CATEGORY_COLORS, type WorkCategory } from "@/lib/works-data"

// === Rhino Footprint SVG ===
function RhinoFootprint({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 50" className={className} style={style} fill="currentColor">
      {/* 3-toed rhino footprint */}
      <ellipse cx="12" cy="10" rx="6" ry="8" transform="rotate(-15 12 10)" />
      <ellipse cx="20" cy="8" rx="5" ry="7" />
      <ellipse cx="28" cy="10" rx="6" ry="8" transform="rotate(15 28 10)" />
      <ellipse cx="20" cy="28" rx="12" ry="16" />
    </svg>
  )
}

// === Footprint Trail (scroll-animated) ===
function FootprintTrail() {
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight))
      setVisible(Math.floor(progress * 8))
    }
    window.addEventListener("scroll", handle, { passive: true })
    handle()
    return () => window.removeEventListener("scroll", handle)
  }, [])

  const positions = [
    { left: "5%", top: "8%", rotate: -25, scale: 0.7 },
    { left: "15%", top: "20%", rotate: -10, scale: 0.8 },
    { left: "8%", top: "33%", rotate: -30, scale: 0.6 },
    { left: "20%", top: "45%", rotate: -5, scale: 0.9 },
    { left: "12%", top: "55%", rotate: -20, scale: 0.7 },
    { left: "22%", top: "67%", rotate: 5, scale: 0.8 },
    { left: "10%", top: "78%", rotate: -15, scale: 0.6 },
    { left: "18%", top: "90%", rotate: -35, scale: 0.7 },
  ]

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {positions.map((pos, i) => (
        <RhinoFootprint
          key={i}
          className="absolute text-blue-500 w-10 h-12 transition-all duration-700"
          style={{
            left: pos.left,
            top: pos.top,
            transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
            opacity: i < visible ? 0.15 + i * 0.02 : 0,
            transitionDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  )
}

// === SAI Comment Bubble ===
function SaiComment({ comment, visible }: { comment: string; visible: boolean }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${visible ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"} overflow-hidden`}
    >
      <div className="relative inline-block">
        {/* Cloud-shaped bubble */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-4 py-2 relative">
          <p className="text-blue-600/80 text-xs japanese-text leading-relaxed italic">
            <span className="not-italic mr-1">🦏</span>
            {comment}
          </p>
          {/* Bubble tail */}
          <div className="absolute -top-2 left-6 w-3 h-3 bg-blue-50 border-l-2 border-t-2 border-blue-200 transform rotate-45" />
        </div>
      </div>
    </div>
  )
}

// === Count Up Animation ===
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}</span>
}

// === Featured Card ===
function FeaturedCard({ project, size }: { project: (typeof works)[0]; size: "large" | "medium" }) {
  const [hovered, setHovered] = useState(false)
  const [from, to] = project.featuredGradient || ["#0c1a3d", "#1e3a8a"]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${size === "large" ? "md:col-span-2 md:row-span-2" : ""} min-h-[280px] md:min-h-[320px] cursor-default group transition-transform duration-500 hover:scale-[1.02]`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      {/* Decorative footprints on card */}
      <RhinoFootprint
        className="absolute text-white w-16 h-20 -right-2 -top-2 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2"
        style={{ opacity: 0.15, transform: "rotate(35deg)" }}
      />
      <RhinoFootprint
        className="absolute text-white w-12 h-15 right-14 top-8 transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{ opacity: 0.1, transform: "rotate(25deg)" }}
      />

      {/* Hand-drawn border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M2,5 Q5,2 10,3 L90,2 Q95,3 97,8 L98,90 Q97,95 92,97 L10,98 Q5,97 3,92 Z" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>

      <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.slice(0, 3).map((cat) => (
            <span key={cat} className="text-xs font-medium text-white/80 bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className={`font-extrabold text-white tracking-tight leading-tight mb-2 ${size === "large" ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
          {project.title}
        </h3>

        {/* Client + Role */}
        <p className="text-white/70 text-sm md:text-base mb-1">{project.client}</p>
        <p className="text-white/90 text-sm md:text-base font-medium">{project.role}</p>

        {/* Hover: SAI comment + details */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${hovered ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
          <div className="border-t border-white/20 pt-4">
            {/* SAI comment in featured card style */}
            {project.saiComment && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 mb-3">
                <p className="text-white/90 text-sm japanese-text italic">
                  <span className="not-italic mr-1 text-base">🦏</span>
                  {project.saiComment}
                </p>
              </div>
            )}
            {project.highlight && (
              <p className="text-white/70 text-xs leading-relaxed">{project.highlight}</p>
            )}
            <div className="flex items-center gap-3 mt-3 text-white/50 text-xs">
              <span>{project.year}年〜{project.endYear === "継続中" ? "継続中" : `${project.endYear}年`}</span>
              {project.externalUrl && (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white underline underline-offset-2">
                  WEB →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// === Work Card (All Works) ===
function WorkCard({ project, delay }: { project: (typeof works)[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const primaryColor = CATEGORY_COLORS[project.categories[0]] || "#2563eb"

  return (
    <div
      className="rounded-xl border-2 border-blue-100 bg-white/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-lg cursor-default relative animate-cardIn"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Category color accent */}
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{ backgroundColor: primaryColor }} />

      <div className="pl-3">
        <h4 className="font-bold text-blue-900 text-base mb-1">{project.title}</h4>
        {project.client && <p className="text-blue-600/70 text-sm mb-3">{project.client}</p>}

        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
              style={{
                color: CATEGORY_COLORS[cat],
                borderColor: CATEGORY_COLORS[cat] + "40",
                backgroundColor: CATEGORY_COLORS[cat] + "08",
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        <span className="text-xs text-blue-400">{project.year}</span>

        {/* Hover: role + sai comment */}
        <div className={`overflow-hidden transition-all duration-300 ${hovered ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
          <p className="text-sm text-blue-700/70 leading-relaxed">{project.role}</p>
          {project.saiComment && <SaiComment comment={project.saiComment} visible={hovered} />}
        </div>
      </div>
    </div>
  )
}

// === Main Section ===
export default function WorksSection() {
  const [activeFilters, setActiveFilters] = useState<Set<WorkCategory>>(new Set())
  const [isAllOpen, setIsAllOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  const featured = works.filter((w) => w.isFeatured)
  const allWorks = works.filter((w) => !w.isFeatured)

  const filtered = activeFilters.size === 0
    ? allWorks
    : allWorks.filter((w) => w.categories.some((c) => activeFilters.has(c)))

  const toggleFilter = (cat: WorkCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
    setVisibleCount(12)
  }

  const totalClients = new Set(works.map((w) => w.client).filter(Boolean)).size
  const totalProjects = works.length

  return (
    <div className="hero-gradient relative" id="works">
      {/* Footprint trail along left side */}
      <FootprintTrail />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8 relative">
        <div className="font-extrabold text-left text-[#3B82F6] leading-[0.8] tracking-[-0.02em] font-inter" style={{ fontSize: "clamp(40px, 16vw, 256px)" }}>
          FOOTPRINTS
        </div>

        {/* Stats with slow count-up */}
        <div className="mt-8 flex flex-wrap gap-6 md:gap-10 text-blue-500 japanese-text">
          <div>
            <div className="text-3xl md:text-5xl font-extrabold"><CountUp end={totalClients} />+</div>
            <div className="text-sm mt-1 text-blue-400">clients</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-extrabold"><CountUp end={totalProjects} /></div>
            <div className="text-sm mt-1 text-blue-400">projects</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-extrabold">2019 – 2026</div>
            <div className="text-sm mt-1 text-blue-400">and counting</div>
          </div>
        </div>
      </div>

      {/* Featured Works — Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(280px,1fr)]">
          {featured.map((project) => (
            <FeaturedCard key={project.id} project={project} size={project.featuredSize || "medium"} />
          ))}
        </div>
      </div>

      {/* Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 relative">
        <div className="flex items-start gap-4">
          <span className="text-4xl mt-1 select-none animate-saiWalk">🦏</span>
          <p className="text-blue-500/80 text-lg md:text-xl japanese-text leading-relaxed max-w-2xl">
            2019年、2人のサイが走り出した。<br />
            国家プロジェクトから蕎麦屋まで。<br />
            寄り道が、いちばん遠くまで連れていってくれる。
          </p>
        </div>
      </div>

      {/* All Works Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 relative">
        <button
          onClick={() => setIsAllOpen(!isAllOpen)}
          className="w-full py-4 border-t-2 border-b-2 border-blue-200 text-blue-500 font-bold text-lg hover:bg-blue-50/50 transition-colors duration-200 flex items-center justify-center gap-3 group"
        >
          <span>ALL WORKS</span>
          {/* Footprint as toggle icon */}
          <RhinoFootprint
            className={`w-5 h-6 text-blue-500 transition-transform duration-500 ${isAllOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
          />
        </button>

        {isAllOpen && (
          <div className="mt-8 animate-fadeIn">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveFilters(new Set())}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200 ${activeFilters.size === 0 ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400"}`}
              >
                全て
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200 ${activeFilters.has(cat) ? "text-white" : "bg-white border-2 border-blue-200 hover:border-blue-400"}`}
                  style={activeFilters.has(cat) ? { backgroundColor: CATEGORY_COLORS[cat], color: "white" } : { color: CATEGORY_COLORS[cat] }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-sm text-blue-400 mb-4">{filtered.length} / {allWorks.length} 件</p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.slice(0, visibleCount).map((project, i) => (
                <WorkCard key={project.id} project={project} delay={i * 50} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-8 text-center">
                <button onClick={() => setVisibleCount((v) => v + 12)} className="text-blue-500 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-2">
                  もっと見る
                  <RhinoFootprint className="w-4 h-5 text-blue-500" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes footprintsFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: footprintsFadeIn 0.4s ease-out;
        }
        @keyframes footprintsCardIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-cardIn {
          animation: footprintsCardIn 0.4s ease-out both;
        }
        @keyframes saiWalk {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(4px) rotate(3deg); }
          75% { transform: translateX(-4px) rotate(-3deg); }
        }
        .animate-saiWalk {
          animation: saiWalk 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
