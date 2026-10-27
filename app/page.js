// The homepage is now just an ASSEMBLY DRAWING: it lists the parts
// in order. Each part lives in its own file in /components.
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Currently from "@/components/Currently";
import Log from "@/components/Log";
import Builds from "@/components/Builds";
import About from "@/components/About";
import Elsewhere from "@/components/Elsewhere";
import SideIndex from "@/components/SideIndex";

export default function Home() {
  return (
    <>
      <Header />
      <SideIndex />
      <main id="top">
        <Hero />
        <Currently />
        <Log />
        <Builds />
        <About />
        <Elsewhere />
      </main>
    </>
  );
}
