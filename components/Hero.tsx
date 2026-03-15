import { heroStats, siteConfig } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-5rem)] items-center pb-12 pt-14 sm:pb-20 sm:pt-20"
    >
      <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="flex flex-col justify-center">
          <p className="section-kicker">Operator</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Addicted to Hard Things.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/68 sm:text-xl">
            Currently a Product Associate at Engine by Starling working across FinCrime, Lending, Savings, Customer Service, Cards and Payments
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-full bg-electric-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-electric-400"
            >
              View Story
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-electric-400/50 hover:bg-white/8"
            >
              Connect on LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {heroStats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={0.08 * (index + 1)}
              className="panel overflow-hidden p-6"
            >
              <div className="mb-5 h-px w-16 bg-electric-400/80" />
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.26em] text-electric-200/90">
                {stat.label}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

