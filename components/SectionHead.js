// A small reusable part: the orange-square label + big heading
// that opens every section. Written once, used five times.
export default function SectionHead({ label, title }) {
  return (
    <div className="sec-head">
      <span className="mono">
        <span className="sq" /> {label}
      </span>
      <h2>{title}</h2>
    </div>
  );
}
