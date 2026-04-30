import { useSiteContent } from "@/contexts/SiteContentContext";

export const About = () => {
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="border-y border-border bg-secondary/40 py-24 lg:py-32">
      <div className="container-editorial grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-5">{about.eyebrow}</div>
          <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{about.heading}</h2>
        </div>
        <div className="space-y-8 lg:col-span-7">
          <div className="border-l-2 border-primary pl-6">
            <p className="text-lg leading-relaxed text-foreground/85">{about.bodyPrimary}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{about.bodySecondary}</p>
          </div>

          <div className="grid gap-6 pt-4 sm:grid-cols-3">
            {about.stats.map((stat) => (
              <div key={stat.id} className="border-t border-border pt-5">
                <div className="h-section text-3xl text-primary">{stat.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
