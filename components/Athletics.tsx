import { beyondWork } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Athletics() {
  return (
    <section id="beyond-work" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Beyond Work"
            title="Competition continues after the desk."
            description="Endurance, boxing, mentoring, and service all reinforce the same instinct: show up consistently and push for a higher standard."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 xl:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <Reveal className="panel p-7 sm:p-8">
            <p className="section-kicker">Athletics</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {beyondWork.athletics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="font-display text-2xl font-semibold tracking-tight text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.26em] text-white/48">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-electric-400/20 bg-electric-500/8 p-5">
              <p className="text-sm uppercase tracking-[0.26em] text-electric-200">
                Strength Benchmarks
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {beyondWork.strength.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-electric-400/30 bg-black/30 px-4 py-2 text-sm text-white/82"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="panel p-7 sm:p-8">
            <p className="section-kicker">Mentoring</p>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
              Lifting the ceiling for other people too.
            </h3>
            <ul className="mt-6 space-y-4 text-base leading-7 text-white/68">
              {beyondWork.mentoring.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="panel p-7 sm:p-8">
            <p className="section-kicker">Impact</p>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
              Service with operational bias.
            </h3>
            <ul className="mt-6 space-y-4 text-base leading-7 text-white/68">
              {beyondWork.impact.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

