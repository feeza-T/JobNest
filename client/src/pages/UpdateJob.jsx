import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import toast from "react-hot-toast"

const UpdateJob = () => {
  const navigate = useNavigate()
  const job = useLoaderData()

  // Get id from /update/:id
  const { id } = useParams()

  const [selectedDate, setSelectedDate] = useState(
    job?.deadline ? new Date(job.deadline) : new Date()
  )

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target

    const job_title = form.job_title.value
    const category = form.category.value
    const min_price = parseFloat(form.min_price.value)
    const max_price = parseFloat(form.max_price.value)
    const description = form.description.value

    // Check price
    if (max_price < min_price) {
      return toast.error(
        "Maximum price can't be lower than minimum price"
      )
    }

    const updatedJob = {
      job_title,
      category,
      min_price,
      max_price,
      description,
      deadline: selectedDate,
    }

    try {
      setLoading(true)

      // Backend uses PUT, not PATCH
      await axios.put(
        `${import.meta.env.VITE_API_URL}/job/${id}`,
        updatedJob
      )

      toast.success("Job updated successfully")

      navigate("/my-posted-jobs")
    } catch (error) {
      console.log(error)
      toast.error("Failed to update job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071710] bg-[radial-gradient(circle_at_top,_#0C2A1E,_#071710_65%)] px-4 py-12">

      <section className="mx-auto max-w-3xl rounded-2xl border border-[#8FA998]/10 bg-[#0B2117]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:p-8">

        <div className="border-b border-[#8FA998]/10 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4A93A]">
            Manage Listing
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#FAF6EF]">
            Update Your Job
          </h2>

          <p className="mt-2 text-sm text-[#9FB3A6]">
            Update the details of your posted job.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Job Title */}
            <div>
              <label
                className="text-sm font-medium text-[#D9E4DC]"
                htmlFor="job_title"
              >
                Job Title
              </label>

              <input
                id="job_title"
                name="job_title"
                type="text"
                defaultValue={job?.job_title || ""}
                required
                className="mt-2 block w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="text-sm font-medium text-[#D9E4DC]"
                htmlFor="emailAddress"
              >
                Email Address
              </label>

              <input
                id="emailAddress"
                type="email"
                name="email"
                value={job?.buyer?.email || ""}
                disabled
                readOnly
                className="mt-2 block w-full rounded-xl border border-[#8FA998]/10 bg-[#081C13] px-4 py-3 text-[#6B8577] outline-none"
              />
            </div>

            {/* Deadline */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-[#D9E4DC]"
                htmlFor="deadline"
              >
                Deadline
              </label>

              <DatePicker
                id="deadline"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-[#D9E4DC]"
                htmlFor="category"
              >
                Category
              </label>

              <select
                name="category"
                id="category"
                defaultValue={job?.category || ""}
                required
                className="rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
              >
                <option value="Web Development">
                  Web Development
                </option>

                <option value="Graphic Design">
                  Graphic Design
                </option>

                <option value="Digital Marketing">
                  Digital Marketing
                </option>
              </select>
            </div>

            {/* Minimum Price */}
            <div>
              <label
                className="text-sm font-medium text-[#D9E4DC]"
                htmlFor="min_price"
              >
                Minimum Price
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
                  defaultValue={job?.min_price || ""}
                  className="block w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 pl-9 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                />
              </div>
            </div>

            {/* Maximum Price */}
            <div>
              <label
                className="text-sm font-medium text-[#D9E4DC]"
                htmlFor="max_price"
              >
                Maximum Price
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
                  defaultValue={job?.max_price || ""}
                  className="block w-full rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 pl-9 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label
              className="text-sm font-medium text-[#D9E4DC]"
              htmlFor="description"
            >
              Description
            </label>

            <textarea
              className="mt-2 block w-full resize-none rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-[#FAF6EF] outline-none transition focus:border-[#F4A93A]/50 focus:ring-2 focus:ring-[#F4A93A]/10"
              name="description"
              id="description"
              rows="6"
              required
              defaultValue={job?.description || ""}
            />
          </div>

          {/* Buttons */}
          <div className="mt-7 flex justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate("/my-posted-jobs")}
              className="rounded-xl border border-[#8FA998]/20 px-6 py-3 text-sm font-medium text-[#9FB3A6] transition hover:border-[#8FA998]/40 hover:text-[#FAF6EF]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#F4A93A] px-7 py-3 text-sm font-semibold text-[#0B1F16] transition hover:bg-[#ffc064] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Job →"}
            </button>

          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob