"use client";
// Light/dark switch. The choice is saved in the visitor's browser
// (localStorage) so it's remembered next visit. With no saved choice,
// the site follows the phone or laptop's own setting.
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // null until we're in the browser, so server and browser agree on
  // the first render (no hydration mismatch).
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved || system);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button className="theme-btn" type="button" onClick={toggle} aria-label={label} title={label}>
      {/* Sun shows in dark mode (tap for light); moon in light mode. */}
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
