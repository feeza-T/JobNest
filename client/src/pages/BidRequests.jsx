import toast from "react-hot-toast"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import useAxiosSecure from "../hooks/useAxiosSecure"
import useAuth from "../hooks/useAuth"

const BidRequests = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()

  const getData = async () => {
    const { data } = await axiosSecure(
      `/bid-requests/${user?.email}`
    )

    return data
  }

  const {
    data: bids = [],
    isLoading,
  } = useQuery({
    queryFn: getData,
    queryKey: ["bids", user?.email],
    enabled: !!user?.email,
  })

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(
        `/bid/${id}`,
        { status }
      )

      return data
    },

    onSuccess: () => {
      toast.success("Bid status updated")

      queryClient.invalidateQueries({
        queryKey: ["bids"],
      })

      queryClient.invalidateQueries({
        queryKey: ["my-bids"],
      })
    },

    onError: error => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update bid"
      )
    },
  })

  const handleStatus = async (
    id,
    prevStatus,
    status
  ) => {
    if (prevStatus === status) return

    await mutateAsync({
      id,
      status,
    })
  }

  const getStatusStyle = status => {
    if (status === "Pending") {
      return "border-[#F4A93A]/25 bg-[#F4A93A]/10 text-[#F4A93A]"
    }

    if (status === "In Progress") {
      return "border-sky-400/20 bg-sky-400/10 text-sky-300"
    }

    if (status === "Complete") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    }

    if (status === "Rejected") {
      return "border-red-400/20 bg-red-400/10 text-red-300"
    }

    return "border-[#8FA998]/20 bg-[#8FA998]/10 text-[#9FB3A6]"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071C15] px-4 py-10 text-center text-[#9FB3A6]">
        Loading bid requests...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#071C15] px-4 py-8 text-[#FAF6EF] md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F4A93A]">
              Manage Applications
            </p>

            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
              Bid Requests
            </h1>
          </div>

          <span className="rounded-full border border-[#F4A93A]/25 bg-[#F4A93A]/10 px-3 py-1.5 text-xs font-semibold text-[#F4A93A]">
            {bids.length} Requests
          </span>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-[#8FA998]/20 bg-[#0F2E22]">
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-[#092219]">
                <tr>
                  {[
                    "Title",
                    "Email",
                    "Deadline",
                    "Price",
                    "Category",
                    "Status",
                    "Actions",
                  ].map(item => (
                    <th
                      key={item}
                      className="whitespace-nowrap border-b border-[#8FA998]/15 px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8FA998]"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#8FA998]/10">
                {bids.map(bid => (
                  <tr
                    key={bid._id}
                    className="transition hover:bg-[#163B2D]/50"
                  >

                    {/* Title */}
                    <td className="max-w-[180px] px-4 py-3">
                      <p className="truncate text-sm font-medium text-[#FAF6EF]">
                        {bid.job_title}
                      </p>
                    </td>

                    {/* Email */}
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-[#9FB3A6]">
                      {bid.email}
                    </td>

                    {/* Deadline */}
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-[#D9E4DC]">
                      {bid.deadline
                        ? new Date(
                            bid.deadline
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-[#F4A93A]">
                      ${bid.price}
                    </td>

                    {/* Category */}
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="rounded-full border border-[#8FA998]/20 bg-[#163B2D] px-2.5 py-1 text-[10px] text-[#D9E4DC]">
                        {bid.category ||
                          "Uncategorized"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                          bid.status
                        )}`}
                      >
                        {bid.status || "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex gap-2">

                        {/* Accept */}
                        <button
                          onClick={() =>
                            handleStatus(
                              bid._id,
                              bid.status,
                              "In Progress"
                            )
                          }
                          disabled={
                            bid.status !== "Pending"
                          }
                          title="Accept"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#8FA998]/20 bg-[#092219] text-[#9FB3A6] transition hover:border-emerald-400/30 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          ✓
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() =>
                            handleStatus(
                              bid._id,
                              bid.status,
                              "Rejected"
                            )
                          }
                          disabled={
                            bid.status !== "Pending"
                          }
                          title="Reject"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#8FA998]/20 bg-[#092219] text-[#9FB3A6] transition hover:border-red-400/30 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          ×
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* Empty State */}
          {bids.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-[#FAF6EF]">
                No bid requests yet
              </p>

              <p className="mt-1 text-xs text-[#9FB3A6]">
                New bids will appear here.
              </p>
            </div>
          )}

        </div>

      </div>
    </main>
  )
}

export default BidRequests