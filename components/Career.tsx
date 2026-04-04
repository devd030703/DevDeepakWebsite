import { careerItems } from "@/lib/content";
import { getCompanyStyle } from "@/lib/brandStyles";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Career() {
  return (
    <section id="career" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Career"
            title="Broad product range, founder-mode operating style, and leadership repetition."
            description="From banking infrastructure to startup execution and student leadership, the through-line is range with ownership."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {careerItems.map((item, index) => (
            <Reveal
              key={`${item.company}-${item.role}`}
              delay={0.07 * index}
              className="panel p-7 sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-electric-400/30 bg-electric-500/10 font-display text-sm uppercase tracking-[0.2em] text-electric-200">
                    {item.mark}
                  </div>
                  <div>
                    <p
                      className="text-sm uppercase tracking-[0.28em]"
                      style={getCompanyStyle(item.company)}
                    >
                      {item.company}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                      {item.role}
                    </h3>
                  </div>
                </div>
                <div className="hidden h-px flex-1 bg-white/10 lg:block" />
              </div>

              <p className="mt-6 text-base leading-7 text-white/68">
                {item.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/55"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3 text-sm leading-6 text-white/60">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

