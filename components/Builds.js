import SectionHead from "./SectionHead";
import { builds } from "@/data/content";

export default function Builds() {
  return (
    <section id="builds">
      <div className="wrap">
        <SectionHead label="Builds" title="Things I've built on the web." />
        <div className="builds">
          {builds.map((b, i) => (
            <a className="build" href="#" key={b.name}>
              <div className="top mono">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{b.kind}</span>
              </div>
              <h3>{b.name}</h3>
              <p>{b.text}</p>
            </a>
          ))}
        </div>
        <p className="mono note">
          Curious about any of these? <a className="say-hi" href="#elsewhere">Say hi <span aria-hidden="true">↘</span></a>
        </p>
      </div>
    </section>
  );
}
