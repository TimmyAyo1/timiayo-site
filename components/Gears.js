"use client";
// Two meshing spur gears, turned by the visitor's scrolling.
// Real gear maths (simplified tooth shape):
//   module m = 4  ->  pitch radius r = m * teeth / 2
//   12 teeth: r = 24   |   18 teeth: r = 36   |   centre distance = 24 + 36 = 60
//   ratio 18:12 = 3:2, so the small gear turns 1.5x faster, in the opposite direction.
import { useEffect, useRef } from "react";

const M = 4;

// Builds the outline of a gear as an SVG path.
function gearPath(teeth, cx, cy) {
  const r = (M * teeth) / 2; // pitch radius
  const tip = r + M; // addendum = 1 module
  const root = r - 1.25 * M; // dedendum = 1.25 modules
  const p = (2 * Math.PI) / teeth; // angle per tooth
  const pt = (rad, a) => `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let k = 0; k < teeth; k++) {
    const c = k * p; // centre of this tooth
    d += `${k === 0 ? "M" : "L"}${pt(root, c - 0.5 * p)} L${pt(root, c - 0.28 * p)} L${pt(tip, c - 0.13 * p)} L${pt(tip, c + 0.13 * p)} L${pt(root, c + 0.28 * p)} `;
  }
  return d + "Z";
}

// Small gear centre and big gear centre, 60 units apart.
const A = { x: 46, y: 46, z: 12 };
const B = { x: 106, y: 46, z: 18 };
const SMALL = gearPath(A.z, A.x, A.y);
const BIG = gearPath(B.z, B.x, B.y);
// Rotate the big gear by half a tooth so its gap lines up with the small gear's tooth.
const BIG_OFFSET = 360 / B.z / 2;

export default function Gears() {
  const small = useRef(null);
  const big = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const a = window.scrollY * 0.3; // degrees of rotation per pixel scrolled
      small.current?.setAttribute("transform", `rotate(${a} ${A.x} ${A.y})`);
      big.current?.setAttribute("transform", `rotate(${BIG_OFFSET - a * (A.z / B.z)} ${B.x} ${B.y})`);
    };
    // requestAnimationFrame: update at most once per screen refresh.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg className="gears" viewBox="0 0 150 92" aria-hidden="true">
      <g ref={small} transform={`rotate(0 ${A.x} ${A.y})`}>
        <path d={SMALL} />
        <circle cx={A.x} cy={A.y} r="9" />
        <circle className="hub" cx={A.x} cy={A.y} r="3.5" />
      </g>
      <g ref={big} transform={`rotate(${BIG_OFFSET} ${B.x} ${B.y})`}>
        <path d={BIG} />
        <circle cx={B.x} cy={B.y} r="22" />
        <circle cx={B.x} cy={B.y} r="5" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <line key={deg} x1={B.x + 5 * Math.cos(a)} y1={B.y + 5 * Math.sin(a)} x2={B.x + 22 * Math.cos(a)} y2={B.y + 22 * Math.sin(a)} />
          );
        })}
      </g>
    </svg>
  );
}
