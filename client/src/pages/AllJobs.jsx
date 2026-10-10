import { useEffect, useState } from "react"
import JobCard from "../components/JobCard"
import axios from "axios"

const CATEGORIES = [
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Writing",
  "Video Editing",
  "Data Analysis",
  "Mobile Development",
  "Programming",
]

const AllJobs = () => {
  const [itemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/all-jobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
        )

        setJobs(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [currentPage, itemsPerPage, filter, sort, search])

  useEffect(() => {
    const getCount = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/jobs-count?filter=${filter}&search=${search}`
        )

        setCount(data.count)
      } catch (error) {
        console.log(error)
      }
    }

    getCount()
  }, [filter, search])

  const numberOfPages = Math.ceil(count / itemsPerPage)

  const pages = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  )

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchText)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilter("")
    setSort("")
    setSearch("")
    setSearchText("")
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-[#071C15] px-4 py-10 text-[#FAF6EF] md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4A93A]">
            Explore Opportunities
          </p>

          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            Find work that fits you.
          </h1>

          <p className="mt-2 text-sm text-[#9FB3A6]">
            Search, filter and sort available jobs.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-7 rounded-2xl border border-[#8FA998]/20 bg-[#0F2E22] p-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_auto]">

            {/* Filter */}
            <select
              value={filter}
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-sm text-[#FAF6EF] outline-none focus:border-[#F4A93A]/50"
            >
              <option value="">All Categories</option>

              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex overflow-hidden rounded-xl border border-[#8FA998]/20 bg-[#092219]"
            >
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search job title..."
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[#FAF6EF] outline-none placeholder:text-[#6B8577]"
              />

              <button
                type="submit"
                className="bg-[#F4A93A] px-5 text-sm font-semibold text-[#0F2E22] hover:bg-[#ffc064]"
              >
                Search
              </button>
            </form>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => {
                setSort(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-xl border border-[#8FA998]/20 bg-[#092219] px-4 py-3 text-sm text-[#FAF6EF] outline-none focus:border-[#F4A93A]/50"
            >
              <option value="">Sort By Deadline</option>
              <option value="desc">Latest First</option>
              <option value="asc">Earliest First</option>
            </select>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="rounded-xl border border-[#8FA998]/20 bg-[#163B2D] px-5 py-3 text-sm font-semibold text-[#D9E4DC] hover:border-[#F4A93A]/40 hover:text-[#F4A93A]"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result info */}
        <div className="mb-5 flex items-center justify-between text-sm">
          <p className="text-[#9FB3A6]">
            Showing{" "}
            <span className="font-semibold text-[#FAF6EF]">
              {jobs.length}
            </span>{" "}
            jobs
          </p>

          <p className="text-[#6B8577]">
            Total: {count}
          </p>
        </div>

        {/* Jobs */}
        {jobs.length > 0 ? (
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
  {jobs.map((job, index) => (
    <JobCard
      key={job._id}
      job={job}
      index={index}
    />
  ))}
</div>
        ) : (
          <div className="rounded-2xl border border-[#8FA998]/20 bg-[#0F2E22] py-12 text-center">
            <h3 className="text-lg font-semibold">
              No jobs found
            </h3>

            <p className="mt-1 text-sm text-[#9FB3A6]">
              Try changing your search or filter.
            </p>
          </div>
        )}

        {/* Pagination */}
        {numberOfPages > 1 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="rounded-lg border border-[#8FA998]/20 bg-[#0F2E22] px-4 py-2 text-sm text-[#D9E4DC] hover:text-[#F4A93A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {pages.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 min-w-9 rounded-lg border px-3 text-sm font-semibold ${
                  currentPage === page
                    ? "border-[#F4A93A] bg-[#F4A93A] text-[#0F2E22]"
                    : "border-[#8FA998]/20 bg-[#0F2E22] text-[#D9E4DC] hover:text-[#F4A93A]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === numberOfPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="rounded-lg border border-[#8FA998]/20 bg-[#0F2E22] px-4 py-2 text-sm text-[#D9E4DC] hover:text-[#F4A93A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </main>
  )
}

export default AllJobs