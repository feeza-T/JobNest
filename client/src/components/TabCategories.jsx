import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import JobCard from "./JobCard"

const tabs = [
  { key: "all", label: "All" },
  { key: "web development", label: "Web" },
  { key: "graphics design", label: "Graphics" },
  { key: "digital marketing", label: "Digital" },
]

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

  // Filter jobs
  const filteredJobs =
    tabs[activeTab].key === "all"
      ? jobs
      : jobs.filter(
          (job) =>
            job.category?.toLowerCase() ===
            tabs[activeTab].key.toLowerCase()
        )

  return (
    <section className="relative overflow-hidden bg-[#0A2118] px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .jn-display {
          font-family: 'Fraunces', serif;
        }

        .jn-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4A93A]/10 blur-[110px]" />

      <div className="container relative z-10 mx-auto">

        {/* Heading */}
        <div className="mx-auto max-w-xl text-center">
          <span className="jn-body text-[11px] uppercase tracking-[0.18em] text-[#6B8577]">
            Open roles
          </span>

          <h2 className="jn-display mt-3 text-3xl font-medium text-[#FAF6EF] sm:text-4xl">
            Pick a lane
          </h2>

          <p className="jn-body mt-3 text-sm text-[#9FB3A6] sm:text-base">
            Explore opportunities across the categories companies are hiring
            for right now.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex items-center justify-center">
          <div className="relative flex flex-wrap justify-center gap-1 rounded-full border border-[#8FA998]/20 bg-white/[0.03] p-1.5 backdrop-blur-sm">

            {tabs.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`
                  jn-body
                  relative
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition-colors
                  duration-300
                  sm:px-7
                  ${
                    activeTab === i
                      ? "text-[#0F2E22]"
                      : "text-[#D9E4DC] hover:text-[#FAF6EF]"
                  }
                `}
              >
                {/* Animated active background */}
                {activeTab === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#F4A93A] shadow-[0_4px_20px_rgba(244,169,58,0.18)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                {tab.label}

                {/* Job count */}
                {tab.key !== "all" && (
                  <span
                    className={`
                      ml-2 text-[10px]
                      ${
                        activeTab === i
                          ? "text-[#0F2E22]/70"
                          : "text-[#6B8577]"
                      }
                    `}
                  >
                    {
                      jobs.filter(
                        (job) =>
                          job.category?.toLowerCase() ===
                          tab.key.toLowerCase()
                      ).length
                    }
                  </span>
                )}

                {tab.key === "all" && (
                  <span
                    className={`
                      ml-2 text-[10px]
                      ${
                        activeTab === i
                          ? "text-[#0F2E22]/70"
                          : "text-[#6B8577]"
                      }
                    `}
                  >
                    {jobs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="mt-12" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tabs[activeTab].key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    index={index}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full py-12 text-center"
                >
                  <p className="jn-body text-lg font-medium text-[#FAF6EF]">
                    No jobs found
                  </p>

                  <p className="jn-body mt-2 text-sm text-[#6B8577]">
                    No {tabs[activeTab].label.toLowerCase()} roles have been
                    posted yet.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default TabCategories