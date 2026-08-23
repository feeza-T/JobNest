import { useEffect, useState } from "react"

const heroContent = [
  {
    highlight: "your dream job",
    description:
      "Discover meaningful opportunities that match your skills, goals, and ambitions.",
  },
  {
    highlight: "top talent",
    description:
      "Connect talented professionals with companies building something worth joining.",
  },
  {
    highlight: "remote work",
    description:
      "Find flexible remote opportunities from companies hiring talented people worldwide.",
  },
  {
    highlight: "your next move",
    description:
      "Take the next step in your career with thousands of opportunities curated for you.",
  },
]

const categories = [
  {
    label: "Design",
    pos: "top-[12%] left-[3%]",
    delay: "0s",
    rot: "-4deg",
  },
  {
    label: "Engineering",
    pos: "top-[10%] right-[5%]",
    delay: "0.5s",
    rot: "3deg",
  },
  {
    label: "Marketing",
    pos: "bottom-[27%] left-[3%]",
    delay: "1s",
    rot: "2deg",
  },
  {
    label: "Product",
    pos: "top-[48%] right-[3%]",
    delay: "1.5s",
    rot: "-3deg",
  },
  {
    label: "Data",
    pos: "bottom-[12%] right-[9%]",
    delay: "0.8s",
    rot: "4deg",
  },
]

const companies = [
  "Northwind",
  "Lumora",
  "Fenwick & Co",
  "Brightbase",
  "Solace",
  "Voltek",
  "Ridgeline",
  "Ampera",
]

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 41) % 100}%`,
  top: `${(i * 57) % 100}%`,
  delay: `${(i % 7) * 0.7}s`,
  duration: `${4 + (i % 4)}s`,
}))

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroContent.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const activeContent = heroContent[activeIndex]

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A2118] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .jn-display {
          font-family: 'Fraunces', serif;
        }

        .jn-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* ===============================
           BACKGROUND GLOW
        =============================== */

        @keyframes jn-glow {
          0%, 100% {
            opacity: .25;
            transform: scale(1);
          }

          50% {
            opacity: .6;
            transform: scale(1.12);
          }
        }

        .jn-glow {
          animation: jn-glow 7s ease-in-out infinite;
        }


        /* ===============================
           FLOATING CATEGORY
        =============================== */

        @keyframes jn-float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation));
          }

          50% {
            transform: translateY(-15px) rotate(var(--rotation));
          }
        }

        .jn-chip {
          animation: jn-float 7s ease-in-out infinite;
          animation-delay: var(--delay);
        }


        /* ===============================
           MAIN ENTRANCE
        =============================== */

        @keyframes jn-rise {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .jn-rise {
          animation: jn-rise .8s cubic-bezier(.22,1,.36,1) both;
        }


        /* ===============================
           WHOLE TEXT CHANGE
        =============================== */

        @keyframes jn-text-in {
          from {
            opacity: 0;
            transform: translateY(15px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .jn-text-change {
          animation: jn-text-in .6s ease-out both;
        }


        /* ===============================
           PARTICLES
        =============================== */

        @keyframes jn-particle {
          0% {
            opacity: 0;
            transform: translateY(0) scale(.5);
          }

          30% {
            opacity: .7;
          }

          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-60px) scale(.2);
          }
        }

        .jn-particle {
          animation: jn-particle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }


        /* ===============================
           SEARCH FLOAT
        =============================== */

        @keyframes jn-search {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        .jn-search {
          animation: jn-search 5s ease-in-out infinite;
        }


        /* ===============================
           BUTTON GLOW
        =============================== */

        @keyframes jn-button {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(244,169,58,0);
          }

          50% {
            box-shadow: 0 0 0 9px rgba(244,169,58,.07);
          }
        }

        .jn-button {
          animation: jn-button 3s ease-in-out infinite;
        }


        /* ===============================
           MARQUEE
        =============================== */

        @keyframes jn-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .jn-marquee {
          animation: jn-marquee 22s linear infinite;
        }


        /* ===============================
           BRANCH
        =============================== */

        @keyframes jn-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .jn-branch {
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          animation: jn-draw 2.5s ease-out .5s forwards;
        }


        /* ===============================
           SHIMMER
        =============================== */

        @keyframes jn-shimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        .jn-shimmer {
          animation: jn-shimmer 4s ease-in-out infinite;
        }


        /* ===============================
           REDUCED MOTION
        =============================== */

        @media (prefers-reduced-motion: reduce) {
          .jn-glow,
          .jn-chip,
          .jn-rise,
          .jn-text-change,
          .jn-particle,
          .jn-search,
          .jn-button,
          .jn-marquee,
          .jn-branch,
          .jn-shimmer {
            animation: none !important;
          }
        }


        /* ===============================
           MOBILE
        =============================== */

        @media (max-width: 640px) {
          .jn-marquee {
            animation-duration: 18s;
          }
        }
      `}</style>


      {/* =================================
          BACKGROUND
      ================================= */}

      <div
        className="
          jn-glow
          pointer-events-none
          absolute
          -top-32
          left-1/2
          h-[20rem]
          w-[20rem]
          -translate-x-1/2
          rounded-full
          bg-[#F4A93A]/20
          blur-[100px]
          sm:h-[28rem]
          sm:w-[28rem]
        "
      />

      <div
        className="
          jn-glow
          pointer-events-none
          absolute
          -bottom-32
          right-1/4
          h-72
          w-72
          rounded-full
          bg-[#8FA998]/20
          blur-[100px]
          sm:h-96
          sm:w-96
        "
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />


      {/* =================================
          PARTICLES
      ================================= */}

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="jn-particle pointer-events-none absolute h-1 w-1 rounded-full bg-[#F4A93A]/60"
          style={{
            left: particle.left,
            top: particle.top,
            "--delay": particle.delay,
            "--duration": particle.duration,
          }}
        />
      ))}


      {/* =================================
          CATEGORY CHIPS
      ================================= */}

      {categories.map((category) => (
        <span
          key={category.label}
          className={`
            jn-chip
            jn-body
            absolute
            hidden
            select-none
            rounded-full
            border
            border-[#8FA998]/30
            bg-white/[0.04]
            px-3.5
            py-1.5
            text-xs
            text-[#D9E4DC]
            backdrop-blur-sm
            md:block
            ${category.pos}
          `}
          style={{
            "--delay": category.delay,
            "--rotation": category.rot,
          }}
        >
          {category.label}
        </span>
      ))}


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">


        {/* BADGE */}

        <span
          className="
            jn-body
            jn-rise
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#8FA998]/30
            bg-white/[0.05]
            px-3
            py-1.5
            text-[10px]
            text-[#D9E4DC]
            backdrop-blur-sm
            sm:px-4
            sm:text-xs
          "
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#F4A93A] opacity-50" />

            <span className="relative h-2 w-2 rounded-full bg-[#F4A93A]" />
          </span>

          2,000+ new roles added this week
        </span>


        {/* =================================
            HEADLINE
        ================================= */}

        <div
          className="
            mt-8
            min-h-[155px]
            w-full
            sm:mt-9
            sm:min-h-[190px]
            lg:min-h-[215px]
          "
        >

          <h1
            key={activeIndex}
            className="
              jn-display
              jn-text-change
              text-[38px]
              font-medium
              leading-[1.15]
              tracking-[-0.02em]
              text-[#FAF6EF]
              sm:text-[52px]
              lg:text-[64px]
            "
          >
            Find{" "}

            <span className="text-[#F4A93A]">
              your
            </span>

            {" "}place
            <br />

            <span className="mt-1 inline-block">
              in{" "}

              <span className="text-[#F4A93A]">
                {activeContent.highlight}
              </span>
            </span>
          </h1>

        </div>


        {/* =================================
            DESCRIPTION
        ================================= */}

        <div
          className="
            min-h-[85px]
            w-full
            max-w-xl
            sm:min-h-[70px]
          "
        >
          <p
            key={`description-${activeIndex}`}
            className="
              jn-body
              jn-text-change
              text-sm
              leading-6
              text-[#9FB3A6]
              sm:text-base
              sm:leading-7
            "
          >
            {activeContent.description}
          </p>
        </div>


        {/* =================================
            BUTTONS
        ================================= */}

        <div
          className="
            jn-rise
            mt-7
            flex
            w-full
            flex-col
            gap-3
            sm:mt-8
            sm:w-auto
            sm:flex-row
          "
          style={{ animationDelay: ".3s" }}
        >

          <button
            type="button"
            className="
              jn-button
              jn-body
              w-full
              rounded-full
              bg-[#F4A93A]
              px-7
              py-3
              text-sm
              font-semibold
              text-[#0F2E22]
              transition-all
              duration-300
              hover:scale-105
              hover:brightness-105
              sm:w-auto
            "
          >
            Browse jobs
          </button>


          <button
            type="button"
            className="
              jn-body
              w-full
              rounded-full
              border
              border-[#8FA998]/40
              bg-white/[0.03]
              px-7
              py-3
              text-sm
              font-semibold
              text-[#FAF6EF]
              backdrop-blur-sm
              transition-all
              duration-300
              hover:scale-105
              hover:border-[#F4A93A]/50
              hover:bg-white/[0.06]
              sm:w-auto
            "
          >
            Post a job
          </button>

        </div>


        {/* =================================
            SEARCH
        ================================= */}

        <div
          className="
            jn-search
            jn-rise
            relative
            mt-10
            flex
            w-full
            max-w-2xl
            flex-col
            gap-2
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-2
            backdrop-blur-md
            sm:mt-12
            sm:flex-row
            sm:items-center
          "
          style={{ animationDelay: ".4s" }}
        >

          {/* shimmer */}

          <div
            className="
              jn-shimmer
              pointer-events-none
              absolute
              inset-y-0
              left-0
              w-1/3
              skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/[0.05]
              to-transparent
            "
          />


          {/* JOB */}

          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              items-center
              gap-2
              rounded-xl
              px-3
              py-2.5
            "
          >

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[#9FB3A6]"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M21 21l-4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <span className="jn-body truncate text-left text-xs text-[#9FB3A6] sm:text-sm">
              Job title, keyword, or company
            </span>

          </div>


          <span className="hidden h-6 w-px bg-white/10 sm:block" />


          {/* LOCATION */}

          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              items-center
              gap-2
              rounded-xl
              px-3
              py-2.5
            "
          >

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[#9FB3A6]"
            >
              <path
                d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <circle
                cx="12"
                cy="10"
                r="2.4"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>

            <span className="jn-body truncate text-left text-xs text-[#9FB3A6] sm:text-sm">
              Location
            </span>

          </div>


          {/* SEARCH BUTTON */}

          <button
            type="button"
            className="
              jn-body
              relative
              w-full
              shrink-0
              rounded-xl
              bg-[#0F2E22]
              px-6
              py-3
              text-sm
              font-semibold
              text-[#FAF6EF]
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:bg-[#16412F]
              sm:w-auto
            "
          >
            Search
          </button>

        </div>


        {/* =================================
            STATS
        ================================= */}

        <div
          className="
            jn-rise
            mt-12
            grid
            w-full
            max-w-md
            grid-cols-3
            gap-3
            sm:mt-14
            sm:gap-8
          "
          style={{ animationDelay: ".5s" }}
        >

          <div className="group">

            <p
              className="
                jn-display
                text-2xl
                text-[#FAF6EF]
                transition-transform
                duration-300
                group-hover:-translate-y-1
                sm:text-3xl
              "
            >
              12k+
            </p>

            <p className="jn-body mt-1 text-[10px] text-[#9FB3A6] sm:text-xs">
              Live roles
            </p>

          </div>


          <div className="group">

            <p
              className="
                jn-display
                text-2xl
                text-[#FAF6EF]
                transition-transform
                duration-300
                group-hover:-translate-y-1
                sm:text-3xl
              "
            >
              3.4k
            </p>

            <p className="jn-body mt-1 text-[10px] text-[#9FB3A6] sm:text-xs">
              Companies
            </p>

          </div>


          <div className="group">

            <p
              className="
                jn-display
                text-2xl
                text-[#FAF6EF]
                transition-transform
                duration-300
                group-hover:-translate-y-1
                sm:text-3xl
              "
            >
              98%
            </p>

            <p className="jn-body mt-1 text-[10px] text-[#9FB3A6] sm:text-xs">
              Match satisfaction
            </p>

          </div>

        </div>

      </div>


      {/* =================================
          BOTTOM BRANCH
      ================================= */}

      <svg
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-20
          w-[180%]
          -translate-x-1/2
          opacity-30
          sm:h-28
          sm:w-[140%]
        "
        viewBox="0 0 500 120"
        fill="none"
      >

        <path
          className="jn-branch"
          d="M10 100 C 90 50, 150 110, 230 70 S 360 20, 490 60"
          stroke="#F4A93A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

      </svg>


      {/* =================================
          TRUSTED COMPANIES
      ================================= */}

      <div
        className="
          jn-rise
          relative
          z-10
          mx-auto
          mt-14
          max-w-4xl
          sm:mt-16
        "
        style={{ animationDelay: ".6s" }}
      >

        <p
          className="
            jn-body
            mb-4
            text-center
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-[#6B8577]
            sm:text-[11px]
          "
        >
          Trusted by teams at
        </p>


        <div
          className="
            overflow-hidden
            [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          "
        >

          <div className="jn-marquee flex w-max gap-10 sm:gap-12">

            {[...companies, ...companies].map((company, index) => (
              <span
                key={`${company}-${index}`}
                className="
                  jn-display
                  shrink-0
                  text-base
                  text-[#8FA998]/70
                  transition-colors
                  duration-300
                  hover:text-[#F4A93A]
                  sm:text-lg
                "
              >
                {company}
              </span>
            ))}

          </div>

        </div>

      </div>

    </section>
  )
}

export default Banner