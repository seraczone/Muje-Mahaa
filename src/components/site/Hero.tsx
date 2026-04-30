import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { resolveImageSource } from "@/lib/site-content";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const heroCopyVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.78,
      ease: easeOutExpo,
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const heroCopyItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      ease: easeOutExpo,
    },
  },
};

const heroImageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 64,
    scale: 0.94,
    rotate: 2,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.92,
      ease: easeOutExpo,
    },
  },
};

export const Hero = () => {
  const { content } = useSiteContent();
  const hero = content.hero;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative bg-background">
      <div className="container-editorial grid items-center gap-12 pb-20 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-24">
        <motion.div
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
          variants={heroCopyVariants}
          className="lg:col-span-7"
        >
          <motion.div variants={heroCopyItemVariants} className="eyebrow mb-6">
            {hero.eyebrow}
          </motion.div>
          <motion.h1 variants={heroCopyItemVariants} className="h-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            {hero.titleLead} <span className="text-primary">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p variants={heroCopyItemVariants} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {hero.description}
          </motion.p>

          <motion.div variants={heroCopyItemVariants} className="mt-10 flex flex-wrap items-center gap-4">
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
          </motion.div>

          <motion.div variants={heroCopyItemVariants} className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {hero.stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={heroCopyItemVariants}
                className="border-l-2 border-primary pl-4"
              >
                <div className="h-section text-3xl text-foreground">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
          variants={heroImageVariants}
          className="relative isolate lg:col-span-5"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 top-10 -z-10 h-32 w-32 rounded-full bg-primary/16 blur-3xl"
            animate={shouldReduceMotion ? undefined : { x: [0, -10, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 right-0 -z-10 h-40 w-40 rounded-full bg-rally/12 blur-3xl"
            animate={shouldReduceMotion ? undefined : { x: [0, 12, 0], y: [0, 16, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 0.8, 0, -0.8, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-gradient-to-br from-primary/8 via-white to-rally/8 p-3 shadow-[0_30px_80px_-46px_rgba(15,23,42,0.52)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-secondary">
                <motion.img
                  src={resolveImageSource(hero.imageKey, hero.imageUrl)}
                  alt="APC supporters at a Nasarawa rally"
                  width={1600}
                  height={1000}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.8, ease: easeOutExpo }}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-white/0 via-white/25 to-white/0 mix-blend-screen"
                  animate={shouldReduceMotion ? undefined : { x: ["0%", "230%"] }}
                  transition={{
                    duration: 2.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1.3,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/80">{hero.overlayEyebrow}</div>
                  <div className="mt-1 h-section text-2xl text-white">{hero.overlayTitle}</div>
                </div>
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
