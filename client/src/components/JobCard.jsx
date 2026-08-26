/* eslint-disable react/prop-types */
import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion"
import { Link } from "react-router-dom"

const JobCard = ({ job, index = 0 }) => {
  const {
    _id,
    job_title,
    category,
    deadline,
    description,
    min_price,
    max_price,
  } = job || {}

  const cardRef = useRef(null)

  // Raw pointer position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Tilt springs
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [9, -9]),
    {
      stiffness: 250,
      damping: 22,
    }
  )

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-9, 9]),
    {
      stiffness: 250,
      damping: 22,
    }
  )

  // Spotlight
  const glowX = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["10%", "90%"]
  )

  const glowY = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["10%", "90%"]
  )

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(240px circle at ${x} ${y}, rgba(244,169,58,0.16), transparent 70%)`
  )

  // Mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    mouseX.set(
      (e.clientX - rect.left) / rect.width - 0.5
    )

    mouseY.set(
      (e.clientY - rect.top) / rect.height - 0.5
    )
  }

  // Mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <Link to={`/jobs/${_id}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{
          opacity: 0,
          y: 28,
          rotateX: -14,
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
        }}
        exit={{
          opacity: 0,
          y: -16,
          transition: {
            duration: 0.25,
          },
        }}
        transition={{
          duration: 0.55,
          delay: index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 900,
        }}
        className="
          jn-body
          group
          relative
          w-full
          max-w-sm
          overflow-hidden
          rounded-2xl
          border
          border-[#8FA998]/20
          bg-[#0F2E22]
          p-5
          shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)]
          transition-colors
          duration-300
          hover:border-[#F4A93A]/40
        "
      >
        {/* Cursor tracking spotlight */}
        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
          style={{
            background: glowBackground,
          }}
        />

        {/* Faint fixed glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-28
            w-28
            rounded-full
            bg-[#F4A93A]/10
            blur-2xl
          "
        />

        <div
          className="relative z-10"
          style={{
            transformStyle: "preserve-3d",
          }}
        >

          {/* Top row */}
          <div className="flex items-center justify-between gap-2">

            <span className="text-[11px] font-medium text-[#9FB3A6]">
              Deadline:{" "}
              <span className="text-[#D9E4DC]">
                {deadline
                  ? new Date(
                      deadline
                    ).toLocaleDateString()
                  : "Not specified"}
              </span>
            </span>

            <span
              className="
                rounded-full
                border
                border-[#F4A93A]/30
                bg-[#F4A93A]/10
                px-3
                py-1
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-[#F4A93A]
              "
            >
              {category || "Uncategorized"}
            </span>

          </div>

          {/* Title */}
          <h1
            style={{
              transform: "translateZ(28px)",
            }}
            className="
              jn-display
              mt-3
              text-xl
              font-medium
              leading-snug
              text-[#FAF6EF]
            "
          >
            {job_title || "Untitled Job"}
          </h1>

          {/* Description */}
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#9FB3A6]">
            {description ||
              "No description available."}
          </p>

          {/* Divider */}
          <div className="mt-4 h-px w-full bg-gradient-to-r from-[#8FA998]/30 via-[#8FA998]/10 to-transparent" />

          {/* Price */}
          <div
            style={{
              transform: "translateZ(24px)",
            }}
            className="mt-4 flex items-baseline gap-1.5"
          >
            <span className="jn-display text-lg text-[#F4A93A]">
              ${min_price ?? 0}
            </span>

            <span className="text-xs text-[#6B8577]">
              —
            </span>

            <span className="jn-display text-lg text-[#F4A93A]">
              ${max_price ?? 0}
            </span>

            <span className="ml-1 text-[10px] uppercase tracking-wide text-[#6B8577]">
              budget
            </span>
          </div>

        </div>
      </motion.div>
    </Link>
  )
}

export default JobCard