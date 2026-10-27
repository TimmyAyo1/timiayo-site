// PROPS in action: Path receives the list of steps from content.js
// and draws one row per step. The status ("done", "ongoing",
// "active") becomes a CSS class, and the CSS decides the bar style.
export default function Path({ steps }) {
  return (
    <ol className="quals" aria-label="Path so far">
      {steps.map((step) => (
        <li key={step.label} className={step.status}>
          <span className="st">{step.status === "active" && <b />}</span>
          <span className="nm">{step.label}</span>
          <span className="bar">
            {/* progress (if set in content.js) sets the bar's fill width */}
            <i style={step.progress != null ? { width: `${step.progress}%` } : undefined} />
          </span>
        </li>
      ))}
    </ol>
  );
}
