import { readdir } from "node:fs/promises";
import path from "node:path";

import Image from "next/image";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const photoPattern = /\.(avif|gif|jpe?g|png|webp)$/i;
const placeholderNames = ["portrait-1.jpg", "portrait-2.jpg", "portrait-3.jpg"];

async function getPhotoPaths() {
  try {
    const directory = path.join(process.cwd(), "public", "photos");
    const entries = await readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && photoPattern.test(entry.name))
      .map((entry) => `/photos/${entry.name}`)
      .sort();
  } catch {
    return [];
  }
}

export async function Photos() {
  const photoPaths = await getPhotoPaths();

  return (
    <section id="photos" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading
            title="Who doesn't like to have a bit of fun"
          />
        </Reveal>

        {photoPaths.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {photoPaths.map((src, index) => (
              <Reveal
                key={src}
                delay={0.06 * index}
                className="panel group overflow-hidden"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={src}
                    alt={`Photo of Dev Deepak ${index + 1}`}
                    fill
                    sizes="(min-width: 1280px) 28rem, (min-width: 768px) 42vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {placeholderNames.map((name, index) => (
              <Reveal
                key={name}
                delay={0.06 * index}
                className="panel flex aspect-[4/5] flex-col justify-end overflow-hidden p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(53,99,255,0.18),transparent_48%)]" />
                <div className="relative z-10">
                  <p className="section-kicker">Upload</p>
                  <p className="mt-4 font-display text-2xl text-white">{name}</p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                    Add this file under public/photos to replace this placeholder.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
