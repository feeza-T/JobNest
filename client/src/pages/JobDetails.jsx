
import { useContext, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useLoaderData, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import toast from "react-hot-toast"

const JobDetails = () => {
  const { user } = useContext(AuthContext)
  const job = useLoaderData()
  const navigate = useNavigate()

  const {
    _id,
    job_title,
    category,
    deadline,
    description,
    min_price,
    max_price,
    buyer,
  } = job || {}

  // DatePicker for deadline
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleChange = (date) => {
    setSelectedDate(date)
  }

  const handleFormSubmission = async (e) => {
    e.preventDefault()

    // Prevent buyer from bidding on their own job
    if (user?.email === buyer?.email) {
      return toast.error("Action Not Permitted!")
    }

    const form = e.target
    const jobId = _id
    const price = parseFloat(form.price.value)

    if (price < parseFloat(min_price)) {
      return toast.error(
        "Offer more or at least equal to Minimum Price"
      )
    }

    const email = user?.email
    const comment = form.comment.value
    const bidDeadline = selectedDate

    const status = "Pending"

    const bidData = {
      jobId,
      job_title,
      price,
      email,
      comment,
      deadline: bidDeadline,
      buyer_email: buyer?.email,
      status,
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bid`,
        bidData
      )

      console.log(data)

      toast.success("Bid Placed Successfully")
      navigate("/my-bids")
    } catch (err) {
      console.log(err)
      toast.error("Failed to place bid")
    }
  }

  return (
    <main className="min-h-screen bg-[#071C15] px-4 py-10 md:px-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed left-0 top-20 h-72 w-72 rounded-full bg-[#F4A93A]/5 blur-3xl" />

      <div className="pointer-events-none fixed right-0 bottom-0 h-96 w-96 rounded-full bg-[#8FA998]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Back button */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#9FB3A6] transition hover:text-[#F4A93A]"
        >
          <span>←</span>
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ================================================= */}
          {/* LEFT - JOB DETAILS */}
          {/* ================================================= */}

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-[#8FA998]/20 bg-[#0F2E22] p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] md:p-8 lg:col-span-2"
          >

            {/* Card glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#F4A93A]/10 blur-3xl" />

            <div className="relative">

              {/* Top information */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2 text-sm text-[#9FB3A6]">
                  <span>
                    Deadline:{" "}
                    {deadline
                      ? new Date(deadline).toLocaleDateString()
                      : "Not specified"}
                  </span>
                </div>

                <span className="w-fit rounded-full border border-[#F4A93A]/30 bg-[#F4A93A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F4A93A]">
                  {category || "Uncategorized"}
                </span>

              </div>

              {/* Job title */}
              <h1 className="jn-display mt-7 max-w-4xl text-3xl font-medium leading-tight text-[#FAF6EF] md:text-5xl">
                {job_title || "Untitled Job"}
              </h1>

              {/* Divider */}
              <div className="mt-7 h-px w-full bg-gradient-to-r from-[#8FA998]/30 via-[#8FA998]/10 to-transparent" />

              {/* Description */}
              <div className="mt-7">

                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4A93A]">
                  About this job
                </h2>

                <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#9FB3A6]">
                  {description ||
                    "No description has been provided for this job."}
                </p>

              </div>

              {/* Budget */}
              <div className="mt-8 rounded-2xl border border-[#8FA998]/15 bg-[#092219] p-5">

                <p className="text-xs uppercase tracking-[0.18em] text-[#6B8577]">
                  Project Budget
                </p>

                <div className="mt-2 flex flex-wrap items-baseline gap-2">

                  <span className="jn-display text-3xl text-[#F4A93A]">
                    ${min_price ?? 0}
                  </span>

                  <span className="text-[#6B8577]">
                    —
                  </span>

                  <span className="jn-display text-3xl text-[#F4A93A]">
                    ${max_price ?? 0}
                  </span>

                  <span className="ml-1 text-xs uppercase tracking-wider text-[#6B8577]">
                    USD
                  </span>

                </div>

              </div>

              {/* Buyer information */}
              <div className="mt-8">

                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4A93A]">
                  About the buyer
                </h2>

                <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[#8FA998]/15 bg-[#092219] p-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#8FA998]/20 bg-[#0F2E22]">

                    {buyer?.photo ? (
                      <img
                        src={buyer.photo}
                        alt={buyer.name || "Buyer"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-[#F4A93A]">
                        {(buyer?.name || buyer?.email || "B")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}

                  </div>

                  <div className="min-w-0">

                    <p className="font-medium text-[#FAF6EF]">
                      {buyer?.name || "Job Owner"}
                    </p>

                    <p className="mt-1 break-all text-sm text-[#9FB3A6]">
                      {buyer?.email || "Email not available"}
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </motion.section>


          {/* ================================================= */}
          {/* RIGHT - BID FORM */}
          {/* ================================================= */}

          <motion.section
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-fit overflow-hidden rounded-3xl border border-[#8FA998]/20 bg-[#0F2E22] p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] md:p-7 lg:sticky lg:top-6"
          >

            {/* Form glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F4A93A]/10 blur-3xl" />

            <div className="relative">

              <div className="mb-7">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4A93A]">
                  Ready to work?
                </p>

                <h2 className="jn-display mt-2 text-2xl font-medium text-[#FAF6EF]">
                  Place a Bid
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#9FB3A6]">
                  Submit your offer and let the buyer know why you're the
                  right person for this project.
                </p>

              </div>

              <form
                onSubmit={handleFormSubmission}
                className="space-y-5"
              >

                {/* Price */}
                <div>

                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-[#D9E4DC]"
                  >
                    Your Price
                  </label>

                  <div className="relative mt-2">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4A93A]">
                      $
                    </span>

                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      required
                      placeholder="Enter your price"
                      className="w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 pl-9 text-[#FAF6EF] outline-none transition placeholder:text-[#6B8577] focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                    />

                  </div>

                  <p className="mt-2 text-xs text-[#6B8577]">
                    Buyer budget: ${min_price ?? 0} — ${max_price ?? 0}
                  </p>

                </div>


                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#D9E4DC]"
                  >
                    Your Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    placeholder="Your email"
                    className="mt-2 w-full rounded-xl border border-[#8FA998]/15 bg-[#092219] px-4 py-3 text-[#9FB3A6] outline-none"
                  />

                </div>


                {/* Comment */}
                <div>

                  <label
                    htmlFor="comment"
                    className="text-sm font-medium text-[#D9E4DC]"
                  >
                    Message
                  </label>

                  <textarea
                    id="comment"
                    name="comment"
                    rows="5"
                    required
                    placeholder="Tell the buyer about your approach..."
                    className="mt-2 w-full resize-none rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition placeholder:text-[#6B8577] focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                  />

                </div>


                {/* Deadline */}
                <div>

                  <label
                    htmlFor="deadline"
                    className="text-sm font-medium text-[#D9E4DC]"
                  >
                    Bid Deadline
                  </label>

                  <DatePicker
                    id="deadline"
                    selected={selectedDate}
                    onChange={handleChange}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="mt-2 w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                  />

                </div>


                {/* Submit */}
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-[#F4A93A] px-6 py-3.5 font-semibold text-[#0F2E22] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffc064] hover:shadow-[0_10px_30px_-10px_rgba(244,169,58,0.6)]"
                >
                  <span className="relative z-10">
                    Place Bid →
                  </span>
                </button>

              </form>

            </div>
          </motion.section>

        </div>
      </div>
    </main>
  )
}

export default JobDetails
