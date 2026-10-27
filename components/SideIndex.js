"use client";
// A slim index on the right edge (wide screens only) that shows which
// section you're reading. It "watches" each section with an
// IntersectionObserver: the browser tells us when a section crosses
// the middle of the screen, and we mark that one as active.
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "currently", label: "Now" },
  { id: "log", label: "Log" },
  { id: "builds", label: "Builds" },
  { id: "about", label: "About" },
  { id: "elsewhere", label: "Find me" },
];

export default function SideIndex() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      // Only a thin band across the middle of the screen counts.
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`side-index mono${active === "elsewhere" ? " on-dark" : ""}`} aria-label="Sections">
      {SECTIONS.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
          <span className="tick" />
          <span className="label">{label}</span>
        </a>
      ))}
    </nav>
  );
}
