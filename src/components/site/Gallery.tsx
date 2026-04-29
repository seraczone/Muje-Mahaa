import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const IMGS = [
  { src: g1, label: "Infrastructure" },
  { src: g2, label: "Education" },
  { src: g3, label: "Town Hall" },
  { src: g4, label: "Healthcare" },
  { src: g5, label: "Agriculture" },
  { src: g6, label: "Urban Renewal" },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="bg-secondary/40 border-y border-border py-24 lg:py-32">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5">In the Field</div>
            <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
              Stories from the ground.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            A visual record of our work across Nasarawa — schools, roads, farms and the people we serve.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {IMGS.map((g, i) => (
            <figure key={i} className="group relative overflow-hidden bg-background aspect-[4/3]">
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                decoding="async"
                width={1024}
                height={768}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end p-5">
                <span className="text-xs uppercase tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {g.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
