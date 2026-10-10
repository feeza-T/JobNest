import { useEffect, useRef } from "react";
import gsap from "gsap";

const JobField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".jf-sweep", {
        xPercent: 260,
        duration: 9,
        ease: "none",
        repeat: -1,
        stagger: 3,
      });
      gsap.to(".jf-dot", {
        opacity: 0.15,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.15, repeat: -1 },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(143,169,152,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(143,169,152,0.07)_1px,transparent_1px)] bg-[size:56px_56px]" />

      {/* Light sweeps */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="jf-sweep absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-[#F4A93A]/10 to-transparent"
        />
      ))}

      {/* Job-ticket dots along the grid */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="jf-dot absolute h-1.5 w-1.5 rounded-full bg-[#F4A93A]"
          style={{
            left: `${(i * 37) % 96}%`,
            top: `${(i * 53) % 90}%`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
};

export default JobField;