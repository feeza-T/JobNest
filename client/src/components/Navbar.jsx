import { useContext, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"

import logo from "../assets/images/logo.png"
import { Link, NavLink } from "react-router-dom"
import { HiMenu, HiX } from "react-icons/hi"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-[#F4A93A]" : "text-[#9FB3A6] hover:text-[#FAF6EF]"
    } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[#F4A93A] after:transition-transform after:duration-300 ${
      isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
    }`

  const drawerLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-[#F4A93A]/10 text-[#F4A93A]"
        : "text-[#DDE7E0] hover:bg-[#F4A93A]/10 hover:text-[#F4A93A]"
    }`

  const dropdownLinkClass =
    "block rounded-lg px-3 py-2 text-sm text-[#DDE7E0] transition-colors duration-200 hover:bg-[#F4A93A]/10 hover:text-[#F4A93A]"

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/jobs", label: "All Jobs" },
  { to: "/add-job", label: "Add Job", auth: true },
  { to: "/my-posted-jobs", label: "My Posted Jobs", auth: true },
  { to: "/my-bids", label: "My Bids", auth: true },
  { to: "/bid-requests", label: "Bid Requests", auth: true },
]

  return (
    <div className="sticky top-0 z-50 border-b border-[#8FA998]/10 bg-[#0B2117]/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
        >
          <img className="h-7 w-auto" src={logo} alt="SoloSphere" />
          <span className="font-bold text-[#FAF6EF]">SoloSphere</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks
            .filter((link) => !link.auth || user)
            .map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!user && (
            <NavLink
              to="/login"
              className="hidden rounded-xl bg-[#F4A93A] px-4 py-2 text-sm font-semibold text-[#0B1F16] transition-all duration-200 hover:bg-[#ffc064] hover:shadow-[0_0_0_3px_rgba(244,169,58,0.15)] lg:inline-block"
            >
              Login
            </NavLink>
          )}

          {/* Avatar dropdown - desktop, account actions only */}
          {user && (
            <div className="dropdown dropdown-end z-50 hidden lg:block">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-0 transition-all duration-200 hover:ring-2 hover:ring-[#F4A93A]/40"
              >
                <div
                  title={user?.displayName}
                  className="w-10 overflow-hidden rounded-full ring-2 ring-[#8FA998]/20 transition-all duration-200"
                >
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-56 origin-top-right rounded-2xl border border-[#8FA998]/10 bg-[#0B2117] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-200"
              >
                <li className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-[#7E9689]">
                  {user?.displayName || "My Account"}
                </li>

                <div className="my-1 h-px bg-[#8FA998]/10" />

                <li>
                  <button
                    onClick={logOut}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-300 transition-colors duration-200 hover:bg-red-400/10 hover:text-red-400"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="btn btn-ghost btn-circle text-[#FAF6EF] lg:hidden"
            aria-label="Open menu"
          >
            <HiMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-[#0B2117] shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-[#8FA998]/10 px-5 py-4">
            <Link
              to="/"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2"
            >
              <img className="h-6 w-auto" src={logo} alt="SoloSphere" />
              <span className="font-bold text-[#FAF6EF]">SoloSphere</span>
            </Link>
            <button
              onClick={() => setDrawerOpen(false)}
              className="btn btn-ghost btn-circle btn-sm text-[#9FB3A6] hover:text-[#FAF6EF]"
              aria-label="Close menu"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          {user && (
            <div className="flex items-center gap-3 border-b border-[#8FA998]/10 px-5 py-4">
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#8FA998]/20">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#FAF6EF]">
                  {user?.displayName || "My Account"}
                </p>
                <p className="truncate text-xs text-[#7E9689]">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {/* Links */}
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
            {navLinks
              .filter((link) => !link.auth || user)
              .map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setDrawerOpen(false)}
                    className={drawerLinkClass}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
          </ul>

          {/* Footer action */}
          <div className="border-t border-[#8FA998]/10 p-4">
            {user ? (
              <button
                onClick={() => {
                  logOut()
                  setDrawerOpen(false)
                }}
                className="w-full rounded-xl bg-red-400/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition-colors duration-200 hover:bg-red-400/20 hover:text-red-400"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-xl bg-[#F4A93A] px-4 py-2.5 text-center text-sm font-semibold text-[#0B1F16] transition-colors duration-200 hover:bg-[#ffc064]"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar