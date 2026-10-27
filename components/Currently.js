import SectionHead from "./SectionHead";
import { currently } from "@/data/content";

export default function Currently() {
  return (
    <section id="currently">
      <div className="wrap">
        <SectionHead label="Currently" title="Where I am right now." />
        <div className="now">
          {currently.map((item) => (
            <div key={item.label}>
              <span className="mono">{item.label}</span>
              {item.progress == null ? (
                <strong>{item.text}</strong>
              ) : (
                <div>
                  <strong>{item.text}</strong>
                  <div className="meter" aria-label={`${item.label} progress`}>
                    <i style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
