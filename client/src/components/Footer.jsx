import { Link } from "react-router-dom";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Browse gigs", to: "/jobs" },
      { label: "Categories", to: "/jobs" },
      { label: "Post a gig", to: "/post" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why JobNest", href: "#why" },
      { label: "Contact", href: "#contact" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", to: "/terms" },
      { label: "Privacy", to: "/privacy" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-[#F4A93A]/15 bg-[#0F2E22] px-4 py-14 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p
          className="text-2xl text-[#FAF6EF]"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Job<span className="text-[#F4A93A]">Nest</span>
        </p>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[#9FB3A6]">
          A marketplace where clients find skilled freelancers and talent wins steady work.
        </p>
      </div>

      {columns.map((col) => (
        <div key={col.title}>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F4A93A]">
            {col.title}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {col.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href} className="text-sm text-[#D9E4DC] hover:text-[#F4A93A]">
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.to} className="text-sm text-[#D9E4DC] hover:text-[#F4A93A]">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mx-auto mt-12 max-w-6xl border-t border-[#8FA998]/15 pt-6 text-xs text-[#6B8577]">
      © {new Date().getFullYear()} JobNest. All rights reserved.
    </div>
  </footer>
);

export default Footer;