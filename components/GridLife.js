"use client";
// Brings the background grid to life, like a drafting table or a
// plotter at work. Drawn on a <canvas> (one bitmap, cheap to repaint):
//   PENS:   a few pens travel along the grid lines. At every crossing
//           they go straight or turn 90°, and leave a trail that fades.
//   MARKS:  now and then a construction mark appears on an
//           intersection: a compass circle, a dimension line or a
//           crosshair. It draws itself, holds, then fades away.
// Everything sits behind the page and fades out in the middle (the
// mask on .bg-grid), so it never competes with the text.
import { useEffect, useRef } from "react";

const PENS = 4; // how many pens move at once
const SPEED = 46; // pixels per second
const TRAIL = 7; // seconds a trail takes to fade
const MARK_EVERY = [3.5, 7]; // seconds between marks (min, max)

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export default function GridLife() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones get a lighter version: 2 pens, fainter trails, no marks.
    const phone = window.matchMedia("(max-width: 760px)").matches;
    const penCount = phone ? 2 : PENS;
    const trailStrength = phone ? 0.3 : 0.5;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, cols, rows, cell, accent, muted;
    let pens = [], segs = [], marks = [];
    let nextMark = rand(...MARK_EVERY);
    let last = performance.now(), raf = 0, clock = 0, colourTimer = 0;

    // Read sizes and colours from the CSS tokens, so the canvas
    // follows the same standard as the rest of the site (incl. dark mode).
    function readStyle() {
      const cs = getComputedStyle(document.documentElement);
      cell = parseFloat(cs.getPropertyValue("--cell")) || 56;
      accent = cs.getPropertyValue("--accent").trim() || "#ff653d";
      muted = cs.getPropertyValue("--muted").trim() || "#6c706b";
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readStyle();
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      pens = Array.from({ length: penCount }, newPen);
    }

    // A pen starts on a random crossing, preferably near the edges.
    function newPen() {
      const edge = Math.random() < 0.5 ? rand(0, 0.25) : rand(0.75, 1);
      return {
        x: Math.round(edge * cols) * cell,
        y: Math.round(rand(0, 1) * rows) * cell,
        d: pick(DIRS),
        left: cell, // distance to the next crossing
      };
    }

    function stepPen(p, dt) {
      let move = SPEED * dt;
      while (move > 0) {
        const s = Math.min(move, p.left);
        const nx = p.x + p.d[0] * s, ny = p.y + p.d[1] * s;
        segs.push({ x1: p.x, y1: p.y, x2: nx, y2: ny, t: clock });
        p.x = nx; p.y = ny; p.left -= s; move -= s;
        if (p.left <= 0.001) {
          // At a crossing: mostly straight on, sometimes a 90° turn.
          p.left = cell;
          if (Math.random() < 0.35) {
            const turns = DIRS.filter((d) => d[0] !== p.d[0] && d[1] !== p.d[1]); // the two perpendicular directions
            p.d = pick(turns);
          }
          // Left the screen? Start a fresh pen somewhere else.
          if (p.x < -cell || p.y < -cell || p.x > w + cell || p.y > h + cell) Object.assign(p, newPen());
        }
      }
    }

    function newMark() {
      const kind = pick(["circle", "dim", "cross", "circle"]);
      const cx = Math.round(pick([rand(0, 0.22), rand(0.78, 1)]) * cols) * cell;
      const cy = Math.round(rand(0.1, 0.9) * rows) * cell;
      const len = cell * Math.floor(rand(2, 4));
      return { kind, cx, cy, len, r: cell * pick([0.5, 1, 1.5]), born: clock, life: 6 };
    }

    // How "drawn" a mark is: 0 → 1 over 1.4s, holds, then fades out.
    function markState(m) {
      const age = clock - m.born;
      return { prog: Math.min(age / 1.4, 1), alpha: age > m.life - 1.5 ? Math.max((m.life - age) / 1.5, 0) : 1 };
    }

    function drawMark(m) {
      const { prog, alpha } = markState(m);
      ctx.globalAlpha = 0.55 * alpha;
      ctx.strokeStyle = muted;
      ctx.fillStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (m.kind === "circle") {
        // Compass circle with its centre point
        ctx.arc(m.cx, m.cy, m.r, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
        ctx.stroke();
        ctx.fillRect(m.cx - 1.5, m.cy - 1.5, 3, 3);
      } else if (m.kind === "dim") {
        // Dimension line: two ticks, a line with arrowheads, a value
        const x2 = m.cx + m.len * prog;
        ctx.moveTo(m.cx, m.cy - 6); ctx.lineTo(m.cx, m.cy + 6);
        ctx.moveTo(m.cx, m.cy); ctx.lineTo(x2, m.cy);
        if (prog === 1) {
          ctx.moveTo(x2, m.cy - 6); ctx.lineTo(x2, m.cy + 6);
          ctx.moveTo(m.cx + 6, m.cy - 3); ctx.lineTo(m.cx, m.cy); ctx.lineTo(m.cx + 6, m.cy + 3);
          ctx.moveTo(x2 - 6, m.cy - 3); ctx.lineTo(x2, m.cy); ctx.lineTo(x2 - 6, m.cy + 3);
        }
        ctx.stroke();
        if (prog === 1) {
          ctx.font = "10px ui-monospace, monospace";
          ctx.fillText(`${Math.round(m.len)}`, m.cx + m.len / 2 - 8, m.cy - 6);
        }
      } else {
        // Crosshair on an intersection
        const s = 9 * prog;
        ctx.moveTo(m.cx - s, m.cy); ctx.lineTo(m.cx + s, m.cy);
        ctx.moveTo(m.cx, m.cy - s); ctx.lineTo(m.cx, m.cy + s);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.cx, m.cy, 4 * prog, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05); // cap big jumps (e.g. after a hidden tab)
      last = now;
      clock += dt;
      colourTimer += dt;
      if (colourTimer > 1) { readStyle(); colourTimer = 0; } // follow theme switches

      pens.forEach((p) => stepPen(p, dt));
      segs = segs.filter((s) => clock - s.t < TRAIL);
      marks = marks.filter((m) => clock - m.born < m.life);
      if (!phone && (nextMark -= dt) <= 0) { marks.push(newMark()); nextMark = rand(...MARK_EVERY); }

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = accent;
      // Trails: newest pieces strongest, fading to nothing.
      for (const s of segs) {
        ctx.globalAlpha = trailStrength * (1 - (clock - s.t) / TRAIL);
        ctx.beginPath();
        ctx.moveTo(s.x1 + 0.5, s.y1 + 0.5);
        ctx.lineTo(s.x2 + 0.5, s.y2 + 0.5);
        ctx.stroke();
      }
      // Pen tips
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = accent;
      for (const p of pens) ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
      marks.forEach(drawMark);
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="grid-life" />;
}
