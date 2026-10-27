import Path from "./Path";
import { path } from "@/data/content";

export default function Hero() {
  return (
    <div className="wrap hero">
      <h1>
        Engineer by training, <span className="soft">builder by habit.</span>
      </h1>
      <p className="sub">Mechanical engineer who also writes code.</p>
      <div className="intro">
        <Path steps={path} />
        <a className="jump" href="#builds">
          See my work ↓
        </a>
      </div>
    </div>
  );
}
