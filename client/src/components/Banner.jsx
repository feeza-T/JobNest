import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import JobField from "./JobField";

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
      "Take the next step in your career with opportunities curated for you.",
  },
];

const categories = [
  {
    label: "Design",
    pos: "top-[14%] left-[4%]",
    rot: "-4deg",
  },
  {
    label: "Engineering",
    pos: "top-[12%] right-[5%]",
    rot: "3deg",
  },
  {
    label: "Marketing",
    pos: "bottom-[24%] left-[4%]",
    rot: "2deg",
  },
  {
    label: "Product",
    pos: "top-[50%] right-[4%]",
    rot: "-3deg",
  },
  {
    label: "Data",
    pos: "bottom-[14%] right-[8%]",
    rot: "4deg",
  },
];

const companies = [
  "Northwind",
  "Lumora",
  "Fenwick & Co",
  "Brightbase",
  "Solace",
  "Voltek",
  "Ridgeline",
  "Ampera",
];

const stats = [
  ["12k+", "Live roles"],
  ["3.4k", "Companies"],
  ["98%", "Match satisfaction"],
];

const Banner = () => {
  const scope = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotating hero content
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % heroContent.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-word",
          {
            yPercent: 115,
            opacity: 0,
            duration: 1,
            stagger: 0.09,
          },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .from(
          ".hero-chip",
          {
            scale: 0,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        );

      // Floating category chips
      gsap.to(".hero-chip", {
        y: -10,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.6,
      });

      // Company marquee
      gsap.to(".hero-marquee", {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  // Animate changing text
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-highlight",
        {
          yPercent: 60,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-desc",
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [activeIndex]);

  const active = heroContent[activeIndex];

  return (
    <section
      ref={scope}
      className="
        relative
        overflow-hidden
        bg-[#0A2118]
        px-4
        pb-20
        pt-24
        sm:px-6
        sm:pb-24
        lg:px-8
        lg:pt-28
      "
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .jn-display {
          font-family: 'Fraunces', serif;
        }

        .jn-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* Background field */}
      <JobField />

      {/* Soft glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F4A93A]/8 blur-[130px]" />

      {/* Floating categories */}
      {categories.map((category) => (
        <span
          key={category.label}
          className={`
            hero-chip
            jn-body
            absolute
            z-10
            hidden
            select-none
            rounded-full
            border
            border-[#F4A93A]/20
            bg-[#F4A93A]/[0.07]
            px-3.5
            py-1.5
            text-xs
            font-medium
            text-[#F7D9A4]
            backdrop-blur-sm
            md:block
            ${category.pos}
          `}
          style={{
            transform: `rotate(${category.rot})`,
          }}
        >
          {category.label}
        </span>
      ))}

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">

        {/* Badge */}
        <span
          className="
            hero-badge
            jn-body
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#8FA998]/25
            bg-white/[0.04]
            px-4
            py-1.5
            text-xs
            text-[#D9E4DC]
            backdrop-blur-sm
          "
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#F4A93A] opacity-40" />

            <span className="relative h-2 w-2 rounded-full bg-[#F4A93A]" />
          </span>

          Discover opportunities on JobNest
        </span>

        {/* Hero heading */}
        <h1
          className="
            jn-display
            mt-8
            min-h-[155px]
            w-full
            text-[38px]
            font-medium
            leading-[1.12]
            tracking-[-0.025em]
            text-[#FAF6EF]
            sm:mt-9
            sm:min-h-[185px]
            sm:text-[52px]
            lg:min-h-[210px]
            lg:text-[66px]
          "
        >
          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-word inline-block">
              Find
            </span>
          </span>{" "}

          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-word inline-block text-[#F4A93A]">
              your
            </span>
          </span>{" "}

          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-word inline-block">
              place
            </span>
          </span>

          <br />

          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-word inline-block">
              in
            </span>
          </span>{" "}

          <span className="inline-block overflow-hidden align-bottom">
            <span className="hero-highlight inline-block text-[#F4A93A]">
              {active.highlight}
            </span>
          </span>
        </h1>

        {/* Description */}
        <div className="mt-1 min-h-[70px] w-full max-w-xl">
          <p className="hero-desc jn-body text-sm leading-6 text-[#9FB3A6] sm:text-base sm:leading-7">
            {active.description}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px w-12 bg-[#8FA998]/30" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#F4A93A]" />

          <span className="h-px w-12 bg-[#8FA998]/30" />
        </div>

        {/* Stats */}
        <div className="mt-9 grid w-full max-w-md grid-cols-3 gap-3 sm:mt-11 sm:gap-8">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="hero-stat"
            >
              <p className="jn-display text-2xl text-[#FAF6EF] sm:text-3xl">
                {value}
              </p>

              <p className="jn-body mt-1 text-[10px] text-[#9FB3A6] sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Company marquee */}
      <div className="relative z-10 mx-auto mt-14 max-w-4xl sm:mt-16">

        <p className="jn-body mb-4 text-center text-[10px] uppercase tracking-[0.18em] text-[#6B8577] sm:text-[11px]">
          Trusted by teams at
        </p>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">

          <div className="hero-marquee flex w-max gap-10 sm:gap-12">
            {[...companies, ...companies].map(
              (company, index) => (
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
              )
            )}
          </div>

        </div>

      </div>

    </section>
  );
};

export default Banner;