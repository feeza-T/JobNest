import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext)

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  // Get user's posted jobs
  // Kept outside useEffect so we can call it again after deleting a job
  const getData = async () => {
    if (!user?.email) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobs/${user.email}`
      )

      setJobs(data)
    } catch (error) {
      console.log(error)
      toast.error("Failed to load your jobs")
    } finally {
      setLoading(false)
    }
  }

  // Load jobs when user is available/changes
  useEffect(() => {
    getData()
  }, [user])

  // Delete job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    )

    if (!confirmDelete) return

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/jobs/${id}`
      )

      toast.success("Job deleted successfully")

      // Refresh jobs after deleting
      getData()
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete job")
    }
  }

  return (
    <div className="min-h-screen bg-[#071710] bg-[radial-gradient(circle_at_top,_#0C2A1E,_#071710_65%)]">
      <section className="container mx-auto px-4 pt-14 pb-20">

        {/* Heading */}
        <div className="flex flex-col gap-y-1 border-b border-[#8FA998]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-x-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[#FAF6EF]">
              My Posted Jobs
            </h2>

            <span className="rounded-full bg-[#F4A93A]/10 px-3 py-1 text-xs font-medium text-[#F4A93A] ring-1 ring-inset ring-[#F4A93A]/20">
              {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
            </span>
          </div>

          <Link
            to="/add-job"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#F4A93A] px-5 py-2.5 text-sm font-semibold text-[#0B1F16] transition hover:bg-[#ffc064] sm:mt-0"
          >
            + Post a Job
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-16 flex justify-center">
            <span className="loading loading-spinner text-[#F4A93A]" />
          </div>
        )}

        {/* No jobs */}
        {!loading && jobs.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#8FA998]/10 bg-[#0B2117]/80 p-10 text-center shadow-[0_0_0_1px_rgba(143,169,152,0.03)]">
            <h3 className="text-xl font-medium text-[#FAF6EF]">
              No jobs yet
            </h3>

            <p className="mt-2 text-sm text-[#9FB3A6]">
              You haven't posted any jobs yet.
            </p>

            <Link
              to="/add-job"
              className="mt-5 inline-block rounded-xl bg-[#F4A93A] px-5 py-2.5 text-sm font-semibold text-[#0B1F16] transition hover:bg-[#ffc064]"
            >
              Post a Job →
            </Link>
          </div>
        )}

        {/* Table */}
        {!loading && jobs.length > 0 && (
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl border border-[#8FA998]/10 bg-[#0B2117]/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  <table className="min-w-full divide-y divide-[#8FA998]/10">

                    {/* Table heading */}
                    <thead className="bg-[#081C13]">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-[#7E9689]"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-[#7E9689]"
                        >
                          Deadline
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-[#7E9689]"
                        >
                          Price Range
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-[#7E9689]"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-[#7E9689]"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-[#7E9689]"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>

                    {/* Table body */}
                    <tbody className="divide-y divide-[#8FA998]/10">
                      {jobs.map((job) => (
                        <tr
                          key={job._id}
                          className="transition-colors hover:bg-[#0F2A1D]"
                        >
                          {/* Title */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <Link
                              to={`/jobs/${job._id}`}
                              className="font-medium text-[#FAF6EF] transition hover:text-[#F4A93A]"
                            >
                              {job.job_title}
                            </Link>
                          </td>

                          {/* Deadline */}
                          <td className="px-4 py-4 text-sm text-[#9FB3A6] whitespace-nowrap">
                            {job.deadline
                              ? new Date(job.deadline).toLocaleDateString()
                              : "Not specified"}
                          </td>

                          {/* Price */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <span className="text-[#F4A93A]">
                              ${job.min_price ?? 0}
                            </span>
                            <span className="mx-1 text-[#5C7767]">—</span>
                            <span className="text-[#F4A93A]">
                              ${job.max_price ?? 0}
                            </span>
                          </td>

                          {/* Category */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <p className="inline-block rounded-full border border-[#F4A93A]/20 bg-[#F4A93A]/10 px-3 py-1 text-xs text-[#F4A93A]">
                              {job.category}
                            </p>
                          </td>

                          {/* Description */}
                          <td
                            title={job.description}
                            className="max-w-xs px-4 py-4 text-sm text-[#9FB3A6]"
                          >
                            <p className="line-clamp-2">{job.description}</p>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-4">
                              {/* View */}
                              <Link
                                to={`/jobs/${job._id}`}
                                title="View Job"
                                className="text-[#9FB3A6] transition-colors duration-200 hover:text-[#F4A93A]"
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
                                    d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.208.07.436 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </Link>

                              {/* Edit */}
                              <Link
                                to={`/update-job/${job._id}`}
                                title="Edit Job"
                                className="text-[#9FB3A6] transition-colors duration-200 hover:text-[#F4A93A]"
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </Link>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(job._id)}
                                title="Delete Job"
                                className="text-[#9FB3A6] transition-colors duration-200 hover:text-red-400 focus:outline-none"
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default MyPostedJobs