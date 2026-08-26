import { useContext, useRef, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import toast from "react-hot-toast"

const CATEGORIES = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
]

// Decorative bid cards
const DECK_CARDS = [
  { rotate: -14, x: -150, y: -10, delay: 0, price: "$220" },
  { rotate: 10, x: 160, y: 30, delay: 0.15, price: "$180" },
  { rotate: -4, x: -170, y: 120, delay: 0.3, price: "$260" },
]

const AddJob = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Project start date
  const [startDate, setStartDate] = useState(new Date())

  // Project/job deadline
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [submitting, setSubmitting] = useState(false)

  const sceneRef = useRef(null)

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  })

  // Mouse movement animation
  const handleMouseMove = (e) => {
    const rect = sceneRef.current?.getBoundingClientRect()

    if (!rect) return

    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: py * -10,
      y: px * 14,
    })
  }

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    })
  }

  // Submit job
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please login first")
      return
    }

    const form = e.target

    const job_title = form.job_title.value
    const category = form.category.value

    const min_price = parseFloat(form.min_price.value)
    const max_price = parseFloat(form.max_price.value)

    const description = form.description.value

    // Validate price
    if (max_price < min_price) {
      toast.error("Maximum price can't be lower than minimum price")
      return
    }

    // Validate dates
    if (selectedDate < startDate) {
      toast.error("Deadline cannot be before the start date")
      return
    }

    // Job object
    const newJob = {
      job_title,
      category,
      min_price,
      max_price,
      description,

      // Start date
      startDate,

      // Deadline
      deadline: selectedDate,

      // Buyer as an object
      buyer: {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    }

    console.log("Job data:", newJob)

    try {
      setSubmitting(true)

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/job`,
        newJob
      )

      console.log("Server response:", data)

      toast.success("Job posted successfully!")

      form.reset()

      // Reset dates
      setStartDate(new Date())
      setSelectedDate(new Date())

      navigate("/my-posted-jobs")
    } catch (err) {
      console.log("Error posting job:", err)

      toast.error(
        err?.response?.data?.message ||
          "Something went wrong, try again"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#071C15] px-4 py-16 md:px-8">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed left-0 top-20 h-72 w-72 rounded-full bg-[#F4A93A]/5 blur-3xl" />

      <div className="pointer-events-none fixed right-0 bottom-0 h-96 w-96 rounded-full bg-[#8FA998]/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">

        {/* Hero */}
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4A93A]">
            New Listing
          </p>

          <h1 className="jn-display mt-3 text-3xl font-medium leading-tight text-[#FAF6EF] md:text-5xl">
            Describe the work.
            <br className="hidden md:block" />
            Let it find its people.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#9FB3A6]">
            A clear brief gets better bids. Set your budget, pick a
            start date and deadline, and we'll put it in front of
            the right talent.
          </p>
        </motion.div>

        {/* Scene */}
        <div
          ref={sceneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative"
          style={{
            perspective: "1400px",
          }}
        >

          {/* Floating cards */}
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {DECK_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [
                    card.y,
                    card.y - 10,
                    card.y,
                  ],
                }}
                transition={{
                  opacity: {
                    delay: card.delay,
                    duration: 0.6,
                  },
                  scale: {
                    delay: card.delay,
                    duration: 0.6,
                  },
                  y: {
                    delay: card.delay + 0.6,
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "18%",
                  transform: `translate(${card.x}px, 0px) rotate(${
                    card.rotate + tilt.y * 0.4
                  }deg) rotateX(${tilt.x * 0.6}deg)`,
                }}
                className="w-32 rounded-xl border border-[#8FA998]/20 bg-[#0F2E22]/80 p-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur"
              >
                <div className="h-2 w-10 rounded-full bg-[#8FA998]/30" />

                <p className="jn-display mt-3 text-lg text-[#F4A93A]">
                  {card.price}
                </p>

                <div className="mt-2 h-1.5 w-full rounded-full bg-[#092219]" />
              </motion.div>
            ))}
          </div>

          {/* Form card */}
          <motion.section
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            style={{
              transform: `rotateX(${tilt.x * 0.3}deg) rotateY(${
                tilt.y * 0.3
              }deg)`,
              transformStyle: "preserve-3d",
            }}
            className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-[#8FA998]/20 bg-[#0F2E22] p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] transition-transform duration-150 md:p-9"
          >

            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#F4A93A]/10 blur-3xl" />

            <form
              onSubmit={handleSubmit}
              className="relative space-y-5"
            >

              {/* Job Title */}
              <div>
                <label
                  htmlFor="job_title"
                  className="text-sm font-medium text-[#D9E4DC]"
                >
                  Job Title
                </label>

                <input
                  id="job_title"
                  name="job_title"
                  type="text"
                  required
                  placeholder="e.g. Build a landing page in React"
                  className="mt-2 w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition placeholder:text-[#6B8577] focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-[#D9E4DC]"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">

                {/* Minimum */}
                <div>
                  <label
                    htmlFor="min_price"
                    className="text-sm font-medium text-[#D9E4DC]"
                  >
                    Min Budget
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4A93A]">
                      $
                    </span>

                    <input
                      id="min_price"
                      name="min_price"
                      type="number"
                      min="1"
                      required
                      placeholder="100"
                      className="w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 pl-9 text-[#FAF6EF] outline-none transition placeholder:text-[#6B8577] focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                    />
                  </div>
                </div>

                {/* Maximum */}
                <div>
                  <label
                    htmlFor="max_price"
                    className="text-sm font-medium text-[#D9E4DC]"
                  >
                    Max Budget
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4A93A]">
                      $
                    </span>

                    <input
                      id="max_price"
                      name="max_price"
                      type="number"
                      min="1"
                      required
                      placeholder="300"
                      className="w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 pl-9 text-[#FAF6EF] outline-none transition placeholder:text-[#6B8577] focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                    />
                  </div>
                </div>

              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-[#D9E4DC]"
                >
                  Start Date
                </label>

                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date)

                    // If deadline becomes earlier than start date,
                    // automatically move deadline forward.
                    if (selectedDate < date) {
                      setSelectedDate(date)
                    }
                  }}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  className="mt-2 w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                />
              </div>

              {/* Deadline */}
              <div>
                <label
                  htmlFor="deadline"
                  className="text-sm font-medium text-[#D9E4DC]"
                >
                  Deadline
                </label>

                <DatePicker
                  id="deadline"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={startDate}
                  dateFormat="yyyy-MM-dd"
                  className="mt-2 w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-[#D9E4DC]"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  required
                  placeholder="What needs to get done? Include scope, deliverables, and anything a bidder should know."
                  className="mt-2 w-full resize-none rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition placeholder:text-[#6B8577] focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                />
              </div>

              {/* Buyer */}
              <div className="flex items-center gap-3 rounded-xl border border-[#8FA998]/15 bg-[#092219] px-4 py-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#8FA998]/20 bg-[#0F2E22]">

                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "You"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-[#F4A93A]">
                      {(user?.displayName ||
                        user?.email ||
                        "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}

                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-medium text-[#FAF6EF]">
                    {user?.displayName || "Posting as you"}
                  </p>

                  <p className="truncate text-xs text-[#6B8577]">
                    {user?.email}
                  </p>

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group relative w-full overflow-hidden rounded-xl bg-[#F4A93A] px-6 py-3.5 font-semibold text-[#0F2E22] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffc064] hover:shadow-[0_10px_30px_-10px_rgba(244,169,58,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10">
                  {submitting ? "Posting…" : "Post Job →"}
                </span>
              </button>

            </form>
          </motion.section>
        </div>
      </div>
    </main>
  )
}

export default AddJob