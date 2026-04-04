import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export async function Photos() {
  let files: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "photos");
    const entries = await fs.readdir(dir);
    files = entries.filter((f) => SUPPORTED_EXTENSIONS.has(path.extname(f).toLowerCase()));
  } catch {
    // Directory missing or unreadable — render nothing
  }

  if (files.length === 0) return null;

  return (
    <section id="photos" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Photos" title="Who doesn't like to have a bit of fun" />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file, index) => (
            <Reveal
              key={file}
              delay={0.06 * index}
              className="panel group overflow-hidden"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={`/photos/${file}`}
                  alt={`Dev Deepak photo ${index + 1}`}
                  fill
                  sizes="(min-width: 1280px) 28rem, (min-width: 768px) 42vw, 100vw"
                  priority={index === 0}
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
