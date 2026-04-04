import { siteConfig } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <Container>
        <Reveal className="panel relative overflow-hidden p-8 sm:p-10 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,99,255,0.18),transparent_38%)]" />
          <div className="relative z-10 max-w-2xl">
            <p className="section-kicker">Contact</p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Always happy to meet ambitious people building interesting
              things.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
              The easiest place to reach out is LinkedIn.
            </p>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center rounded-full bg-electric-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-electric-400"
            >
              Connect on LinkedIn
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
