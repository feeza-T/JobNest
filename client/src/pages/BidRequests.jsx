import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { AuthContext } from "../provider/AuthProvider"

const categoryStyles = {
  "Web Development": "border-[#F4A93A]/30 bg-[#F4A93A]/10 text-[#F4A93A]",
  "Graphics Design": "border-[#8FA998]/30 bg-[#8FA998]/10 text-[#8FA998]",
  "Digital Marketing": "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
}
const defaultCategoryStyle =
  "border-[#6B8577]/30 bg-[#6B8577]/10 text-[#9FB3A6]"

const statusStyles = {
  "In progress": {
    pill: "border-[#F4A93A]/30 bg-[#F4A93A]/10 text-[#F4A93A]",
    dot: "bg-[#F4A93A]",
  },
  Complete: {
    pill: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  Rejected: {
    pill: "border-red-400/30 bg-red-400/10 text-red-400",
    dot: "bg-red-400",
  },
}
const defaultStatusStyle = {
  pill: "border-[#8FA998]/30 bg-[#8FA998]/10 text-[#8FA998]",
  dot: "bg-[#8FA998]",
}

const BidRequests = () => {
  const { user } = useContext(AuthContext)

  const [bids, setBids] = useState([])

  useEffect(() => {
    if (user?.email) {
      getData()
    }
  }, [user])

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/bid-requests/${user?.email}`
    )
    setBids(data)
  }

  //handle status
  const handleStatus = async (id, prevStatus, status) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/bid/${id}`,
        { status }
      )
      console.log(data)
      getData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen bg-[#071C15] px-4 py-10 md:px-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed left-0 top-20 h-72 w-72 rounded-full bg-[#F4A93A]/5 blur-3xl" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-96 w-96 rounded-full bg-[#8FA998]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        <div className="mb-7 flex items-center gap-x-3">
          <h2 className="jn-display text-2xl font-medium text-[#FAF6EF] md:text-3xl">
            Bid Requests
          </h2>

          <span className="rounded-full border border-[#F4A93A]/30 bg-[#F4A93A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F4A93A]">
            {bids.length} Request{bids.length === 1 ? "" : "s"}
          </span>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-[#8FA998]/20 bg-[#0F2E22] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)]"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#F4A93A]/10 blur-3xl" />

          <div className="relative overflow-x-auto">
            <table className="min-w-full divide-y divide-[#8FA998]/10">
              <thead className="bg-[#092219]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Deadline
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6B8577]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#8FA998]/10">
                {bids.map((bid) => {
                  const status = statusStyles[bid.status] || defaultStatusStyle
                  const catStyle =
                    categoryStyles[bid.category] || defaultCategoryStyle
                  const decided = !!bid.status && bid.status !== "Pending"

                  return (
                    <tr
                      key={bid._id}
                      className="transition-colors hover:bg-[#092219]/60"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#FAF6EF]">
                        {bid.job_title || "Untitled Job"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#9FB3A6]">
                        {bid.email}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#9FB3A6]">
                        {bid.deadline
                          ? new Date(bid.deadline).toLocaleDateString()
                          : "Not specified"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#F4A93A]">
                        ${bid.price}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${catStyle}`}
                        >
                          {bid.category || "Uncategorized"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full border px-3 py-1 ${status.pill}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          ></span>
                          <span className="text-xs font-medium">
                            {bid.status || "Pending"}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">

                          {/* Accept */}
                          <button
                            title="Accept Bid"
                            disabled={decided}
                            onClick={() =>
                              handleStatus(bid._id, bid.status, "In progress")
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                              decided
                                ? "cursor-not-allowed border-[#8FA998]/10 bg-[#8FA998]/5 text-[#6B8577]"
                                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20"
                            }`}
                          >
                            Accept
                          </button>

                          {/* Reject */}
                          <button
                            title="Reject Bid"
                            disabled={decided}
                            onClick={() =>
                              handleStatus(bid._id, bid.status, "Rejected")
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                              decided
                                ? "cursor-not-allowed border-[#8FA998]/10 bg-[#8FA998]/5 text-[#6B8577]"
                                : "border-red-400/30 bg-red-400/10 text-red-400 hover:bg-red-400/20"
                            }`}
                          >
                            Reject
                          </button>

                        </div>
                      </td>
                    </tr>
                  )
                })}

                {bids.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-[#6B8577]"
                    >
                      No bid requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default BidRequests