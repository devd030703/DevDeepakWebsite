import { educationTimeline } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Timeline() {
  return (
    <section id="timeline" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Story Timeline"
            title="Education as a competitive arc."
            description="Each stage tightened the standard, widened the aperture, and turned curiosity into disciplined execution."
          />
        </Reveal>

        <ol className="relative mt-14 border-l border-white/10 pl-8 sm:pl-10">
          {educationTimeline.map((item, index) => (
            <li key={item.institution} className="relative pb-12 last:pb-0">
              <Reveal delay={0.08 * index}>
                <span className="absolute -left-[41px] top-2 flex h-5 w-5 items-center justify-center rounded-full border border-electric-400/40 bg-[#05070d]">
                  <span className="h-2 w-2 rounded-full bg-electric-300" />
                </span>

                <p className="font-display text-sm uppercase tracking-[0.32em] text-electric-300">
                  Stage {item.stage}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {item.institution}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/66">
                  {item.story}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {item.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

