import { useSiteContent } from "@/contexts/SiteContentContext";
import { resolveImageSource } from "@/lib/site-content";

export const Gallery = () => {
  const { content } = useSiteContent();
  const gallery = content.gallery;

  return (
    <section id="gallery" className="border-y border-border bg-secondary/40 py-24 lg:py-32">
      <div className="container-editorial">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5">{gallery.eyebrow}</div>
            <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{gallery.heading}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">{gallery.intro}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {gallery.items.map((item) => (
            <figure key={item.id} className="group relative aspect-[4/3] overflow-hidden bg-background">
              <img
                src={resolveImageSource(item.imageKey, item.imageUrl)}
                alt={item.label}
                loading="lazy"
                decoding="async"
                width={1024}
                height={768}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-0 flex items-end bg-foreground/0 p-5 transition-colors group-hover:bg-foreground/40">
                <span className="text-xs uppercase tracking-[0.2em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
