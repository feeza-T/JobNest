// ErrorPage.jsx
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const LEAVES = [
  { top: "10%", left: "8%", delay: 0, size: 14, rotate: 20 },
  { top: "20%", left: "88%", delay: 2, size: 10, rotate: -30 },
  { top: "55%", left: "92%", delay: 4.5, size: 12, rotate: 10 },
  { top: "70%", left: "5%", delay: 1.2, size: 11, rotate: -15 },
]

const Leaf = ({ size, color }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      d="M12 2C6 6 4 12 12 22C20 12 18 6 12 2Z"
      fill={color}
      opacity="0.8"
    />
    <path d="M12 4V20" stroke="#071C15" strokeWidth="0.6" opacity="0.3" />
  </svg>
)

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#071C15] px-6 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-[#F4A93A]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#8FA998]/5 blur-3xl" />

      {/* Drifting leaves */}
      {LEAVES.map((l, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ top: l.top, left: l.left }}
          animate={{
            y: [0, 30, 60, 90],
            x: [0, 12, -8, 6],
            rotate: [l.rotate, l.rotate + 40, l.rotate - 20, l.rotate + 10],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 9,
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf size={l.size} color={i % 2 === 0 ? "#F4A93A" : "#8FA998"} />
        </motion.div>
      ))}

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4A93A]">
            404
          </p>
          <h1 className="jn-display mt-3 text-4xl font-medium leading-tight text-[#FAF6EF] md:text-5xl">
            The trail ends here
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-[#9FB3A6]">
            This page wandered off somewhere it shouldn't have. It might've
            been moved, renamed, or never existed at all — let's get you back
            to solid ground.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-xl border border-[#8FA998]/25 bg-[#0F2E22] px-5 py-3 text-sm font-medium text-[#D9E4DC] transition hover:border-[#F4A93A]/40 hover:text-[#F4A93A]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Go back
            </button>

            <Link to="/">
              <button className="rounded-xl bg-[#F4A93A] px-6 py-3 text-sm font-semibold text-[#0F2E22] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffc064] hover:shadow-[0_10px_30px_-10px_rgba(244,169,58,0.6)]">
                Take me home
              </button>
            </Link>
          </div>
        </motion.div>

      {/* Sad girl, sitting lost on a rock in the woods */}
<motion.div
  initial={{ opacity: 0, scale: 0.88, y: 25 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.15,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative mx-auto w-72 md:w-96"
>
  {/* Soft glow behind the character */}
  <motion.div
    className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8FA998]/10 blur-3xl"
    animate={{
      scale: [0.9, 1.05, 0.9],
      opacity: [0.25, 0.4, 0.25],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  <motion.svg
    viewBox="0 0 300 320"
    className="relative z-10 w-full"
    animate={{ y: [0, -4, 0] }}
    transition={{
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Rock shadow */}
    <ellipse
      cx="150"
      cy="294"
      rx="100"
      ry="18"
      fill="#061811"
      opacity="0.45"
    />

    {/* Rock */}
    <ellipse
      cx="150"
      cy="290"
      rx="98"
      ry="17"
      fill="#0F2E22"
    />

    <ellipse
      cx="150"
      cy="282"
      rx="72"
      ry="10"
      fill="#183B2B"
    />

    {/* =========================
        GIRL
    ========================== */}

    <motion.g
      animate={{ y: [0, -1.5, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Back hair */}
      <path
        d="
          M108 145
          C98 108 111 76 150 66
          C189 76 202 108 192 145
          C201 174 197 214 182 239
          C176 216 177 181 168 151
          C163 168 137 168 132 151
          C123 181 124 216 118 239
          C103 214 99 174 108 145
          Z
        "
        fill="#443024"
      />

      {/* Hair soft highlight */}
      <path
        d="
          M116 128
          C112 99 129 78 151 74
          C174 78 188 100 184 126
          C175 107 162 96 150 96
          C136 96 124 108 116 128
          Z
        "
        fill="#59402D"
        opacity="0.7"
      />

      {/* Body / oversized sweater */}
      <path
        d="
          M100 292
          C89 247 104 202 150 184
          C196 202 211 247 200 292
          Z
        "
        fill="#82A28C"
      />

      {/* Sweater center shadow */}
      <path
        d="
          M150 204
          C135 220 130 253 133 291
          L167 291
          C170 253 165 220 150 204
          Z
        "
        fill="#789681"
        opacity="0.45"
      />

      {/* Sweater folds */}
      <path
        d="M117 286 C113 252 123 221 139 210"
        stroke="#5F7C68"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />

      <path
        d="M183 286 C187 252 177 221 161 210"
        stroke="#5F7C68"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />

      <path
        d="M128 285 C126 260 130 239 138 225"
        stroke="#A8C0AE"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      <path
        d="M172 285 C174 260 170 239 162 225"
        stroke="#A8C0AE"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Arms wrapped around knees */}
      <path
        d="M112 260 C104 239 112 218 134 211"
        stroke="#71917F"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M188 260 C196 239 188 218 166 211"
        stroke="#71917F"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hands */}
      <circle
        cx="131"
        cy="216"
        r="6"
        fill="#F4D3AE"
      />

      <circle
        cx="169"
        cy="216"
        r="6"
        fill="#F4D3AE"
      />

      {/* Head + subtle breathing movement */}
      <motion.g
        animate={{
          rotate: [-0.7, 0.7, -0.7],
          y: [0, -1, 0],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "150px 150px",
        }}
      >
        {/* Neck */}
        <path
          d="M140 180 L140 191 Q150 198 160 191 L160 180"
          fill="#EBC5A0"
        />

        {/* Face */}
        <path
          d="
            M150 108
            C128 108 114 124 114 149
            C114 174 130 190 150 190
            C170 190 186 174 186 149
            C186 124 172 108 150 108
            Z
          "
          fill="#F4D3AE"
        />

        {/* Ear shadows */}
        <ellipse
          cx="115"
          cy="151"
          rx="4"
          ry="8"
          fill="#E4B88E"
          opacity="0.7"
        />

        <ellipse
          cx="185"
          cy="151"
          rx="4"
          ry="8"
          fill="#E4B88E"
          opacity="0.7"
        />

        {/* Bangs */}
        <path
          d="
            M113 142
            C109 112 126 88 150 88
            C174 88 191 112 187 142
            C179 121 166 111 150 111
            C134 111 121 121 113 142
            Z
          "
          fill="#443024"
        />

        {/* Hair strand left */}
        <motion.path
          d="M118 120 C108 151 109 181 116 210"
          stroke="#443024"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={{
            transformOrigin: "118px 120px",
          }}
          animate={{
            rotate: [-4, 4, -4],
            x: [0, 1, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hair strand right */}
        <motion.path
          d="M182 120 C192 151 191 181 184 210"
          stroke="#443024"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={{
            transformOrigin: "182px 120px",
          }}
          animate={{
            rotate: [4, -4, 4],
            x: [0, -1, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hair shine */}
        <path
          d="M126 105 C136 94 148 91 159 94"
          stroke="#70523A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Worried eyebrows */}
        <path
          d="M125 140 Q133 134 141 139"
          stroke="#3A291F"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M175 140 Q167 134 159 139"
          stroke="#3A291F"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Eyes - blinking */}
        <motion.g
          animate={{
            scaleY: [1, 1, 0.12, 1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.42, 0.45, 0.49, 1],
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "150px 151px",
          }}
        >
          {/* Left eye */}
          <path
            d="M124 151 Q132 157 140 151"
            stroke="#2B2018"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Right eye */}
          <path
            d="M160 151 Q168 157 176 151"
            stroke="#2B2018"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Soft blush */}
        <ellipse
          cx="126"
          cy="165"
          rx="9"
          ry="5"
          fill="#E99576"
          opacity="0.18"
        />

        <ellipse
          cx="174"
          cy="165"
          rx="9"
          ry="5"
          fill="#E99576"
          opacity="0.18"
        />

        {/* Sad mouth */}
        <path
          d="M142 177 Q150 171 158 177"
          stroke="#2B2018"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tiny nose */}
        <path
          d="M150 155 Q147 162 150 164"
          stroke="#C8926B"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Tear */}
        <motion.path
          d="
            M168 153
            C171 157 171 161 168 164
            C165 161 165 157 168 153
            Z
          "
          fill="#CFE8DE"
          animate={{
            y: [0, 3, 14, 28],
            opacity: [0, 0.85, 0.65, 0],
            scale: [0.7, 1, 1, 0.85],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeIn",
            times: [0, 0.12, 0.65, 1],
          }}
        />
      </motion.g>
    </motion.g>

    {/* =========================
        WILTED FLOWER
    ========================== */}

    <motion.g
      style={{
        transformOrigin: "228px 288px",
      }}
      animate={{
        rotate: [-3, 3, -3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Stem */}
      <path
        d="M228 288 C226 270 232 258 240 250"
        stroke="#6F9280"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaf */}
      <path
        d="M229 273 C220 268 219 261 222 258 C229 260 232 266 229 273 Z"
        fill="#6F9280"
        opacity="0.8"
      />

      {/* Flower */}
      <motion.g
        animate={{
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "241px 250px",
        }}
      >
        <circle
          cx="241"
          cy="248"
          r="5"
          fill="#F4A93A"
          opacity="0.9"
        />

        <circle
          cx="247"
          cy="252"
          r="4.2"
          fill="#F4A93A"
          opacity="0.7"
        />

        <circle
          cx="236"
          cy="253"
          r="4.2"
          fill="#F4A93A"
          opacity="0.7"
        />

        <circle
          cx="242"
          cy="253"
          r="2.2"
          fill="#D88920"
        />
      </motion.g>
    </motion.g>

    {/* Tiny floating particles */}
    <motion.circle
      cx="83"
      cy="205"
      r="2"
      fill="#8FA998"
      animate={{
        y: [0, -12, 0],
        opacity: [0.1, 0.6, 0.1],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.circle
      cx="217"
      cy="180"
      r="1.5"
      fill="#F4A93A"
      animate={{
        y: [0, -10, 0],
        opacity: [0.1, 0.5, 0.1],
      }}
      transition={{
        duration: 4,
        delay: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
</motion.div>
      </div>
    </section>
  )
}

export default ErrorPage