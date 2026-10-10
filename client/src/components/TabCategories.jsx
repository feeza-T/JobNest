import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { Link } from "react-router-dom"
import JobCard from "./JobCard"

const tabs = [
  { key: "all", label: "All" },
  { key: "web development", label: "Web" },
  { key: "graphic design", label: "Graphics" },
  { key: "digital marketing", label: "Digital" },
]

const HOME_JOB_LIMIT = 12

const getId = (job, index) =>
  job._id?.$oid ?? job._id ?? index

const TabCategories = () => {
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/jobs`
        )

        setJobs(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  const matchesTab = (job, key) =>
    key === "all" ||
    job.category?.toLowerCase() ===
      key.toLowerCase()

  const filteredJobs = jobs.filter(job =>
    matchesTab(
      job,
      tabs[activeTab].key
    )
  )

  const visibleJobs = filteredJobs.slice(
    0,
    HOME_JOB_LIMIT
  )

  const countFor = key =>
    jobs.filter(job =>
      matchesTab(job, key)
    ).length

  return (
    <section className="relative overflow-hidden bg-[#0A2118] px-4 py-16 sm:px-6 lg:px-8">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .jn-display {
          font-family: 'Fraunces', serif;
        }

        .jn-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* Background accents */}
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#F4A93A]/5 blur-[110px]" />

      <div className="pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#8FA998]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">

          <span className="jn-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4A93A]">
            Open roles
          </span>

          <h2 className="jn-display mt-2 text-3xl font-medium text-[#FAF6EF] sm:text-4xl">
            Pick a lane
          </h2>

          <p className="jn-body mt-3 text-sm leading-6 text-[#9FB3A6] sm:text-base">
            Explore opportunities across the categories
            companies are hiring for right now.
          </p>

        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">

          <div className="relative isolate flex flex-wrap justify-center gap-1 rounded-full border border-[#8FA998]/20 bg-[#0F2E22] p-1.5 shadow-[0_12px_35px_-22px_rgba(0,0,0,0.8)]">

            {tabs.map((tab, i) => {
              const active =
                activeTab === i

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActiveTab(i)
                  }
                  className={`jn-body relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 sm:px-6 ${
                    active
                      ? "text-[#0F2E22]"
                      : "text-[#9FB3A6] hover:text-[#FAF6EF]"
                  }`}
                >

                  {active && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[#F4A93A] shadow-[0_4px_18px_rgba(244,169,58,0.25)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  {tab.label}

                  <span
                    className={`ml-2 text-[10px] ${
                      active
                        ? "text-[#0F2E22]/65"
                        : "text-[#6B8577]"
                    }`}
                  >
                    {countFor(tab.key)}
                  </span>

                </button>
              )
            })}

          </div>

        </div>

        {/* Job cards */}
        <div className="mt-10">

          <AnimatePresence mode="wait">

            <motion.div
              key={tabs[activeTab].key}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >

              {visibleJobs.length > 0 ? (
                visibleJobs.map(
                  (job, index) => (
                    <JobCard
                      key={getId(
                        job,
                        index
                      )}
                      job={job}
                      index={index}
                    />
                  )
                )
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="col-span-full py-12 text-center"
                >

                  <p className="jn-body text-lg font-medium text-[#FAF6EF]">
                    No jobs found
                  </p>

                  <p className="jn-body mt-2 text-sm text-[#9FB3A6]">
                    No{" "}
                    {tabs[
                      activeTab
                    ].label.toLowerCase()}{" "}
                    roles have been posted yet.
                  </p>

                </motion.div>
              )}

            </motion.div>

          </AnimatePresence>

        </div>

        {/* See All */}
        {filteredJobs.length > 0 && (
          <div className="mt-10 flex justify-center">

            <Link
              to="/all-jobs"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#F4A93A]/30
                bg-[#F4A93A]
                px-6
                py-3
                text-sm
                font-semibold
                text-[#0F2E22]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#FFC064]
                hover:shadow-[0_12px_30px_-14px_rgba(244,169,58,0.55)]
              "
            >
              See All Jobs

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>
        )}

      </div>

    </section>
  )
}

export default TabCategories