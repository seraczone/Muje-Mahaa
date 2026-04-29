import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Hero = () => {
  return (
    <section id="top" className="relative bg-background">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-16 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="eyebrow mb-6">A Movement for Nasarawa</div>
          <h1 className="h-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-foreground">
            MUJE <span className="text-primary">MAHA</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            A united APC support group advancing progress, accountable leadership,
            and lasting community impact across Nasarawa State and Nigeria.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#join"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-primary-foreground px-7 h-12 rounded-sm text-sm font-semibold tracking-wide transition-colors"
            >
              Join the Movement <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#donate"
              className="inline-flex items-center gap-2 border border-rally text-rally hover:bg-rally hover:text-destructive-foreground px-7 h-12 rounded-sm text-sm font-semibold tracking-wide transition-colors"
            >
              Donate
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { v: "13", l: "LGAs" },
              { v: "50K+", l: "Members" },
              { v: "200+", l: "Projects" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-primary pl-4">
                <div className="h-section text-3xl text-foreground">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={hero}
              alt="APC supporters at a Nasarawa rally"
              width={1600}
              height={1000}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/80">Est. Movement</div>
              <div className="h-section text-2xl text-white mt-1">United for Progress</div>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 h-24 w-24 border-t-2 border-r-2 border-gold hidden sm:block" />
          <div className="absolute -bottom-3 -left-3 h-24 w-24 border-b-2 border-l-2 border-primary hidden sm:block" />
        </motion.div>
      </div>
      <div className="h-px w-full bg-border" />
    </section>
  );
};
