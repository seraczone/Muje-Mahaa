import { Quote } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { resolveImageSource } from "@/lib/site-content";

export const Founder = () => {
  const { content } = useSiteContent();
  const leadership = content.leadership;

  return (
    <section id="founder" className="bg-background py-24 lg:py-32">
      <div className="container-editorial max-w-4xl text-center">
        <div className="eyebrow mb-6 justify-center">{leadership.founderEyebrow}</div>
        <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-1 ring-border sm:h-40 sm:w-40">
          <img
            src={resolveImageSource(leadership.founderImageKey, leadership.founderImageUrl)}
            alt="Founder of Muje Maha Support Group"
            loading="lazy"
            decoding="async"
            width={400}
            height={400}
            sizes="(min-width: 640px) 160px, 128px"
            className="h-full w-full bg-white object-contain object-center p-1.5"
          />
        </div>

        <Quote className="mx-auto mt-10 h-7 w-7 text-gold" />
        <blockquote className="mt-6 h-section text-2xl leading-snug text-foreground sm:text-3xl lg:text-4xl">
          "{leadership.founderQuote}"
        </blockquote>
        <div className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {leadership.founderAttribution}
        </div>
      </div>
    </section>
  );
};
