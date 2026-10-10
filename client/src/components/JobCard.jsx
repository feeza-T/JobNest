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

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    {
      stiffness: 250,
      damping: 22,
    }
  )

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    {
      stiffness: 250,
      damping: 22,
    }
  )

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
      `radial-gradient(
        220px circle at ${x} ${y},
        rgba(244,169,58,0.12),
        transparent 70%
      )`
  )

  const handleMouseMove = e => {
    if (!cardRef.current) return

    const rect =
      cardRef.current.getBoundingClientRect()

    mouseX.set(
      (e.clientX - rect.left) /
        rect.width -
        0.5
    )

    mouseY.set(
      (e.clientY - rect.top) /
        rect.height -
        0.5
    )
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <Link
      to={`/jobs/${_id}`}
      className="block h-full"
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: index * 0.04,
        }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        className="
          group
          relative
          flex
          h-full
          min-h-[310px]
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[#8FA998]/20
          bg-[#0F2E22]
          p-4
          shadow-[0_18px_45px_-25px_rgba(0,0,0,0.7)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#F4A93A]/40
          hover:shadow-[0_24px_55px_-28px_rgba(244,169,58,0.25)]
        "
      >
        {/* Cursor glow */}
        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
          style={{
            background: glowBackground,
          }}
        />

        {/* Decorative glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-12
            -top-12
            h-28
            w-28
            rounded-full
            bg-[#F4A93A]/10
            blur-3xl
          "
        />

        <div className="relative z-10 flex h-full flex-col">

          {/* Category */}
          <div className="mb-3">
            <span
              className="
                inline-flex
                max-w-full
                rounded-full
                border
                border-[#F4A93A]/25
                bg-[#F4A93A]/10
                px-2.5
                py-1
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#F4A93A]
              "
            >
              <span className="truncate">
                {category || "Uncategorized"}
              </span>
            </span>
          </div>

          {/* Title */}
          <h2
            className="
              line-clamp-2
              min-h-[48px]
              text-[17px]
              font-semibold
              leading-6
              text-[#FAF6EF]
              transition-colors
              group-hover:text-[#F4A93A]
            "
          >
            {job_title || "Untitled Job"}
          </h2>

          {/* Description */}
          <p
            className="
              mt-2
              line-clamp-3
              min-h-[60px]
              text-xs
              leading-5
              text-[#9FB3A6]
            "
          >
            {description ||
              "No description available."}
          </p>

          {/* Meta */}
          <div
            className="
              mt-4
              rounded-xl
              border
              border-[#8FA998]/10
              bg-[#092219]
              p-3
            "
          >
            {/* Budget */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wide text-[#6B8577]">
                Budget
              </span>

              <span className="text-sm font-semibold text-[#F4A93A]">
                ${min_price ?? 0}
                <span className="mx-1 text-[#6B8577]">
                  –
                </span>
                ${max_price ?? 0}
              </span>
            </div>

            {/* Deadline */}
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wide text-[#6B8577]">
                Deadline
              </span>

              <span className="text-xs font-medium text-[#D9E4DC]">
                {deadline
                  ? new Date(
                      deadline
                    ).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "Not specified"}
              </span>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="
              mt-auto
              flex
              items-center
              justify-between
              border-t
              border-[#8FA998]/10
              pt-3
            "
          >
            <span className="text-[11px] font-medium text-[#9FB3A6]">
              View details
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#163B2D]
                text-sm
                text-[#F4A93A]
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:bg-[#F4A93A]
                group-hover:text-[#0F2E22]
              "
            >
              →
            </span>
          </div>

        </div>
      </motion.article>
    </Link>
  )
}

export default JobCard