import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    title: "Verified clients",
    text: "Every buyer is identified before they post, so you know who you are working with.",
  },
  {
    title: "Transparent budgets",
    text: "Min and max prices are shown up front, so expectations stay clear before you bid.",
  },
  {
    title: "Fair bidding",
    text: "See live bid counts and deadlines, and compete on quality instead of noise.",
  },
  {
    title: "Clear progress",
    text: "Track every bid from pending to in progress and completed without losing context.",
  },
]

const WhyJobNest = () => {
  const scope = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-heading", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
        },
      })

      gsap.from(".why-row", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-list",
          start: "top 82%",
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-[#071C15] px-4 py-20 text-[#FAF6EF] sm:px-6 lg:px-8"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#F4A93A]/5 blur-[110px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#8FA998]/5 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">

        {/* Left */}
        <div className="why-heading lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F4A93A]">
            Why JobNest
          </p>

          <h2
            className="mt-4 max-w-md text-4xl leading-tight text-[#FAF6EF] sm:text-5xl"
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Work should feel
            <span className="block text-[#F4A93A]">
              clear, not chaotic.
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#9FB3A6] sm:text-base">
            JobNest keeps the hiring process simple for both sides —
            discover work, understand the budget, place a bid, and follow
            progress without unnecessary noise.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-16 bg-[#F4A93A]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4A93A]" />
          </div>
        </div>

        {/* Right */}
        <div className="why-list">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="
                why-row
                group
                grid
                gap-4
                border-b
                border-[#8FA998]/15
                py-6
                first:border-t
                sm:grid-cols-[64px_1fr]
                sm:gap-7
                sm:py-7
              "
            >
              {/* Number */}
              <div className="flex items-start">
                <span className="text-xs font-semibold tracking-[0.16em] text-[#F4A93A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3
                  className="
                    text-lg
                    font-semibold
                    text-[#FAF6EF]
                    transition-colors
                    duration-300
                    group-hover:text-[#F4A93A]
                    sm:text-xl
                  "
                >
                  {reason.title}
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#9FB3A6]">
                  {reason.text}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-[#F4A93A]/50" />
                  <span className="h-1 w-1 rounded-full bg-[#F4A93A]/60" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyJobNest