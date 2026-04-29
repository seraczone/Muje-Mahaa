import founder from "@/assets/leader-founder.jpg";
import { Quote } from "lucide-react";

export const Founder = () => {
  return (
    <section id="founder" className="bg-background py-24 lg:py-32">
      <div className="container-editorial max-w-4xl text-center">
        <div className="eyebrow mb-6 justify-center">Our Founder</div>
        <div className="mx-auto h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full ring-1 ring-border">
          <img src={founder} alt="Founder of MUJE MAHA" loading="lazy" decoding="async" width={400} height={400} sizes="(min-width: 640px) 160px, 128px" className="h-full w-full object-cover" />
        </div>

        <Quote className="mx-auto mt-10 h-7 w-7 text-gold" />
        <blockquote className="h-section text-2xl sm:text-3xl lg:text-4xl mt-6 text-foreground leading-snug">
          “When ordinary people unite around a common cause, leadership is no longer
          a privilege — it becomes a shared responsibility.”
        </blockquote>
        <div className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Founder · MUJE MAHA
        </div>
      </div>
    </section>
  );
};
