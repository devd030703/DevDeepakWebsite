import Image from "next/image";

import { photoGallery } from "@/lib/content";

import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Photos() {
  return (
    <section id="photos" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Photos" title="Who doesn't like to have a bit of fun" />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {photoGallery.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={0.06 * index}
              className="panel group overflow-hidden"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 28rem, (min-width: 768px) 42vw, 100vw"
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
