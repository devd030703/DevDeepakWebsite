import { navigation, siteConfig } from "@/lib/content";

import { Container } from "./ui/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 hover:opacity-70"
          >
            <span className="h-2 w-2 rounded-full bg-[#3563ff]" />
            <span className="font-display text-[0.65rem] uppercase tracking-[0.32em] text-gray-700">
              Dev Deepak
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-gray-400 hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            LinkedIn
          </a>
        </div>

        <nav
          aria-label="Mobile section navigation"
          className="no-scrollbar flex gap-5 overflow-x-auto pb-3 md:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-gray-400 hover:text-gray-900"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}