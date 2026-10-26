// page.js inside /app = the homepage ("/").
// Day 2 is a walking skeleton: just enough to prove the pipeline works.
// On Day 3 this gets split into components (Header, Hero, Path, Log...).
export default function Home() {
  return (
    <main className="wrap hero">
      <p className="mono">
        <span className="sq" /> Logbook · Vol. 01
      </p>
      <h1>
        Engineer by training, <span className="soft">builder by habit.</span>
      </h1>
      <p className="sub">I also write code. Notes on both, kept here.</p>
    </main>
  );
}
