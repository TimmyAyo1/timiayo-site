// Tool logos from the "simple-icons" package. Each icon is a small
// object: { title, hex (brand colour), path (the SVG shape) }.
// We draw the shape ourselves, so it can use our theme colours.
import { siShopify, siReact, siNextdotjs, siJavascript, siPython, siFigma, siGit } from "simple-icons";

// "brand: false" = the brand colour is black, which would vanish in
// dark mode, so those use our ink colour on hover instead.
const TOOLS = [
  { icon: siShopify, brand: true },
  { icon: siReact, brand: true },
  { icon: siNextdotjs, brand: false },
  { icon: siJavascript, brand: true },
  { icon: siPython, brand: true },
  { icon: siFigma, brand: true },
  { icon: siGit, brand: true },
];

export default function Tools() {
  return (
    <div className="tools">
      <span className="mono">Tools</span>
      <ul>
        {TOOLS.map(({ icon, brand }, i) => (
          <li
            key={icon.title}
            // CSS variables passed in per tile: its brand colour and its
            // place in the row (used to stagger the entrance).
            style={{ "--brand": brand ? `#${icon.hex}` : "var(--ink)", "--i": i }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={icon.path} />
            </svg>
            <span>{icon.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
