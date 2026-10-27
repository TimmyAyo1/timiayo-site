import Clock from "./Clock";

const NAV = [
  { href: "#log", label: "Log" },
  { href: "#builds", label: "Builds" },
  { href: "#about", label: "About" },
];

export default function Header() {
  return (
    <header className="bar">
      <div className="wrap">
        <a className="brand" href="#top">
          TIMILEHIN A.<span className="sq" />
        </a>
        <nav className="nav mono" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="contact" href="#elsewhere">
            Contact
          </a>
        </nav>
        <div className="clock mono">
          <span className="city">Soest, DE</span>
          <Clock />
        </div>
      </div>
    </header>
  );
}
