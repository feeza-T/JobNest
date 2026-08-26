import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import JobCard from "./JobCard"

const tabs = [
  { key: "web development", label: "Web" },
  { key: "graphics design", label: "Graphics" },
  { key: "digital marketing", label: "Digital" },
]

const TabCategories = () => {
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`)
      setJobs(data)
    }
    getData()
  }, [])

  const filteredJobs = jobs.filter(
    (job) => job.category === tabs[activeTab].key
  )

  return (
    <section className="relative overflow-hidden bg-[#0A2118] px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .jn-display { font-family: 'Fraunces', serif; }
        .jn-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* ambient glow, quieter than the hero's — this section supports, doesn't compete */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4A93A]/10 blur-[110px]" />

      <div className="container relative z-10 mx-auto">
        {/* heading */}
        <div className="mx-auto max-w-xl text-center">
          <span className="jn-body text-[11px] uppercase tracking-[0.18em] text-[#6B8577]">
            Open roles
          </span>
          <h2 className="jn-display mt-3 text-3xl font-medium text-[#FAF6EF] sm:text-4xl">
            Pick a lane
          </h2>
          <p className="jn-body mt-3 text-sm text-[#9FB3A6] sm:text-base">
            Curated openings across the categories companies are hiring for
            right now.
          </p>
        </div>

        {/* pill tab switcher */}
        <div className="mt-10 flex items-center justify-center">
          <div className="relative flex gap-1 rounded-full border border-[#8FA998]/20 bg-white/[0.03] p-1.5 backdrop-blur-sm">
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
                {activeTab === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#F4A93A]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* card grid */}
        <div className="mt-12" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tabs[activeTab].key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <JobCard key={job._id} job={job} index={index} />
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="jn-body col-span-full py-10 text-center text-sm text-[#6B8577]"
                >
                  No {tabs[activeTab].label.toLowerCase()} roles posted yet — check back soon.
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default TabCategories