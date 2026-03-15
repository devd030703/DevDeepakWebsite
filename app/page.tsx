import { Athletics } from "@/components/Athletics";
import { Career } from "@/components/Career";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Intro } from "@/components/Intro";
import { SiteHeader } from "@/components/SiteHeader";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-electric-500/12 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[-2rem] h-[28rem] w-[28rem] rounded-full bg-electric-400/14 blur-[150px]" />
        <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-electric-600/10 blur-[160px]" />
      </div>

      <div className="relative isolate overflow-hidden">
        <SiteHeader />

        <main id="main-content">
          <Hero />
          <Intro />
          <Highlights />
          <Career />
          <Timeline />
          <Athletics />
          <Contact />
        </main>
      </div>
    </>
  );
}

