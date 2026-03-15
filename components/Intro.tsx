import { introManifesto } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function Intro() {
  return (
    <section id="story" className="section-shell">
      <Container>
        <Reveal className="panel grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.42fr_1fr] lg:gap-12">
          <div>
            <p className="section-kicker">Intro</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
              High agency. Fast learning. Hard problems. The appeal is in the
              stretch, not the comfort.
            </p>
          </div>

          <p className="text-balance font-display text-2xl font-medium leading-[1.35] tracking-tight text-white sm:text-3xl">
            {introManifesto}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

