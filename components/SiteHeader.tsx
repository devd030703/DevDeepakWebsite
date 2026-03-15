import { navigation, siteConfig } from "@/lib/content";

import { Container } from "./ui/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <Container className="pt-4">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/45 px-4 py-3 shadow-glow backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="flex items-center gap-3 text-sm font-medium text-white hover:text-electric-200"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-electric-400 shadow-[0_0_18px_rgba(95,126,255,0.9)]" />
              <span className="font-display text-xs uppercase tracking-[0.35em] text-white/88">
                Dev Deepak
              </span>
            </a>

            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-6 md:flex"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/62 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-electric-400/50 hover:bg-electric-500/10 hover:text-electric-100"
            >
              LinkedIn
            </a>
          </div>

          <nav
            aria-label="Mobile section navigation"
            className="no-scrollbar mt-3 flex gap-4 overflow-x-auto pb-1 md:hidden"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm text-white/55 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}

