import { motion, useReducedMotion } from "framer-motion";
import { Hero } from "@/components/site/Hero";
import { HomeLeadershipSpotlights } from "@/components/site/HomeLeadershipSpotlights";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { siteNavItems } from "@/components/site/navigation";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { content } = useSiteContent();
  const home = content.home;
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Hero />
      <HomeLeadershipSpotlights />

      <motion.section
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-background py-24 lg:py-32"
      >
        <div className="container-editorial">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {siteNavItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={item.to}
                  className="group block border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:border-foreground/30"
                >
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open page
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-border bg-secondary/40 py-20 lg:py-24"
      >
        <div className="container-editorial grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="eyebrow mb-4">{home.actionEyebrow}</div>
            <h2 className="h-section text-3xl leading-tight text-foreground lg:text-4xl">
              {home.actionHeading}
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
              {home.actionDescription}
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : 0.08 }}
            className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end"
          >
            <Button asChild className="h-11 rounded-sm bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-deep">
              <Link to="/join">Join Muje Maha Support Group</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm px-6 font-semibold">
              <Link to="/donate">Donate</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Index;
