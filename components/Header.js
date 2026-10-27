import Clock from "./Clock";
import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bar">
      <div className="wrap">
        <a className="brand" href="#top">
          TIMILEHIN A.<span className="sq" />
        </a>
        <Nav />
        <div className="bar-end">
          <div className="clock mono">
            <span className="city">Soest, DE</span>
            <Clock />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
