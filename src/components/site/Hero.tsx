import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { resolveImageSource } from "@/lib/site-content";

export const Hero = () => {
  const { content } = useSiteContent();
  const hero = content.hero;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative bg-background">
      <div className="container-editorial grid items-center gap-12 pb-20 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="eyebrow mb-6">{hero.eyebrow}</div>
          <h1 className="h-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            {hero.titleLead} <span className="text-primary">{hero.titleAccent}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{hero.description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/join"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-primary px-7 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              {hero.primaryCtaText} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/donate"
              className="inline-flex h-12 items-center gap-2 rounded-sm border border-rally px-7 text-sm font-semibold tracking-wide text-rally transition-colors hover:bg-rally hover:text-destructive-foreground"
            >
              {hero.secondaryCtaText}
            </Link>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {hero.stats.map((stat) => (
              <div key={stat.id} className="border-l-2 border-primary pl-4">
                <div className="h-section text-3xl text-foreground">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative lg:col-span-5"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <motion.img
                src={resolveImageSource(hero.imageKey, hero.imageUrl)}
                alt="APC supporters at a Nasarawa rally"
                width={1600}
                height={1000}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1024px) 40vw, 100vw"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-white/80">{hero.overlayEyebrow}</div>
                <div className="mt-1 h-section text-2xl text-white">{hero.overlayTitle}</div>
              </div>
            </div>
          </motion.div>
          <div className="absolute -right-3 -top-3 hidden h-24 w-24 border-r-2 border-t-2 border-gold sm:block" />
          <div className="absolute -bottom-3 -left-3 hidden h-24 w-24 border-b-2 border-l-2 border-primary sm:block" />
        </motion.div>
      </div>
      <div className="h-px w-full bg-border" />
    </section>
  );
};
