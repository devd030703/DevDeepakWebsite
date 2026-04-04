import { highlights } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Highlights() {
  return (
    <section id="highlights" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Signature Highlights"
            title="A track record built around steep curves and high standards."
            description="Career milestones, leadership wins, and signals of execution under pressure."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((highlight, index) => (
            <li key={highlight}>
              <Reveal
                delay={0.05 * index}
                className="panel group flex h-full flex-col justify-between p-6"
              >
                <p className="font-display text-sm uppercase tracking-[0.3em] text-electric-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-10 text-lg leading-7 text-white/80 transition-colors group-hover:text-white">
                  {highlight}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

