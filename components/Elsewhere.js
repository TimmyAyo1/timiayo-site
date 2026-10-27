import { channels } from "@/data/content";

export default function Elsewhere() {
  return (
    <section className="elsewhere" id="elsewhere">
      <div className="wrap">
        <span className="mono">Elsewhere</span>
        <h2>
          Follow along, or just say <em>hi.</em>
        </h2>
        <div className="channels">
          {channels.map((c, i) => (
            <a className="channel" href={c.href} key={c.name} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="mono">
                {String(i + 1).padStart(2, "0")} · {c.kind}
              </span>
              <div>
                <strong>{c.name}</strong>
                <div className="what">{c.what}</div>
              </div>
              <span className="arrow">↗</span>
            </a>
          ))}
        </div>
        <div className="foot mono">
          <span>© 2026 Timilehin A.</span>
          <span>Soest, Germany</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
