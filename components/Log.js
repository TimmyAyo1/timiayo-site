"use client";
// The log runs in the browser because visitors click the filters.
import { useState } from "react";
import SectionHead from "./SectionHead";
import { log } from "@/data/content";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "writing", label: "Writing" },
  { id: "build", label: "Builds" },
  { id: "life", label: "Life" },
];

export default function Log() {
  // STATE: which filter is selected right now.
  const [filter, setFilter] = useState("all");

  // Derived from state: the entries to show. React re-runs this line
  // every time the filter changes, then redraws only what changed.
  const visible = filter === "all" ? log : log.filter((e) => e.type === filter);

  return (
    <section id="log">
      <div className="wrap">
        <SectionHead label="The log" title="Notes, builds and small wins, newest first." />

        <div className="filters" role="group" aria-label="Filter log">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="log">
          {visible.map((entry) => (
            <a className="entry" data-type={entry.type} href={entry.href} key={entry.title}>
              <span className="date">{entry.date}</span>
              <span className="tag">{entry.type}</span>
              <div className="body">
                <h3 className={entry.draft ? "draft" : undefined}>{entry.title}</h3>
                <p>{entry.summary}</p>
              </div>
              <span className="go">{entry.cta} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
