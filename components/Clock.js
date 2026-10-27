"use client";
// "use client" = this component runs in the visitor's browser,
// because it needs to change every second. Everything else on the
// page is finished on the server and arrives as plain HTML.
import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Europe/Berlin",
});

export default function Clock() {
  // STATE: the clock's current reading. It starts empty on purpose:
  // the server and the browser would show different seconds, which is
  // exactly the hydration mismatch you saw on Day 2.
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Runs only in the browser, after the page appears.
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    // Cleanup: stop the timer if the component is ever removed.
    return () => clearInterval(id);
  }, []);

  return <span className="live">{time ?? "--:--:--"}</span>;
}
