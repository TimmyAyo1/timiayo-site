"use client";
// The nav runs in the browser because on phones it opens and closes.
// STATE: is the mobile menu open? On laptops the button is hidden by
// CSS and the links simply sit in the bar.
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#log", label: "Log" },
  { href: "#builds", label: "Builds" },
  { href: "#about", label: "About" },
  { href: "#elsewhere", label: "Find me", contact: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the menu when Escape is pressed.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        className="menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>

      <nav id="main-nav" className={`nav mono${open ? " open" : ""}`} aria-label="Main">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={l.contact ? "contact" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
            {l.contact && <span className="arrow" aria-hidden="true">↘</span>}
          </a>
        ))}
      </nav>
    </>
  );
}
