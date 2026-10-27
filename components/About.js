import Image from "next/image";
import { facts } from "@/data/content";
import photo from "@/public/timi.jpg";
import Tools from "./Tools";

export default function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div className="about-side">
          <span className="mono">
            <span className="sq" /> About
          </span>
          <figure className="photo">
            <div className="frame">
              {/* Importing the file lets Next.js read its size and make a
                  blurred preview; it then serves a resized copy per device. */}
              <Image
                src={photo}
                alt="Timilehin smiling outdoors on a sunny day"
                sizes="(max-width: 760px) 220px, 240px"
                placeholder="blur"
              />
            </div>
            <figcaption>Soest, 2026</figcaption>
          </figure>
        </div>
        <div>
          <h2>I like understanding how things work.</h2>
          <div className="about-copy">
            <p>
              Engineering taught me to take things apart before I try to improve them. I work that way
              whether it&apos;s a system on paper or a store on screen.
            </p>
            <p>
              This site is less of a résumé and more of a record: the engineering, the code, the lessons,
              the slow progress in German, and whatever I&apos;m curious about this month.
            </p>
            <div className="facts">
              {facts.map((f) => (
                <div className="fact" key={f.label}>
                  <span>{f.label}</span>
                  <strong>{f.value}</strong>
                </div>
              ))}
            </div>
            <Tools />
          </div>
        </div>
      </div>
    </section>
  );
}
