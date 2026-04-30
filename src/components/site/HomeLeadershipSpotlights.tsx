import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { getThemeClasses, resolveImageSource } from "@/lib/site-content";

type SpotlightConfig = {
  achievementId: "president" | "governor";
  leaderId: "leader-president" | "leader-governor";
  eyebrow: string;
  reverse?: boolean;
};

const spotlightConfig: SpotlightConfig[] = [
  {
    achievementId: "president",
    leaderId: "leader-president",
    eyebrow: "Federal Leadership",
  },
  {
    achievementId: "governor",
    leaderId: "leader-governor",
    eyebrow: "State Leadership",
    reverse: true,
  },
];

export const HomeLeadershipSpotlights = () => {
  const { content } = useSiteContent();
  const shouldReduceMotion = useReducedMotion();

  const spotlights = spotlightConfig
    .map((config) => {
      const leader = content.leadership.leaders.find((item) => item.id === config.leaderId);
      const achievement = content.achievements.tabs.find((item) => item.id === config.achievementId);

      if (!leader || !achievement) {
        return null;
      }

      return {
        ...config,
        leader,
        achievement,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (spotlights.length === 0) {
    return null;
  }

  return (
    <>
      {spotlights.map((spotlight, index) => {
        const theme = getThemeClasses(spotlight.achievement.theme);
        const textOrderClass = spotlight.reverse ? "lg:order-2" : "lg:order-1";
        const imageOrderClass = spotlight.reverse ? "lg:order-1" : "lg:order-2";

        return (
          <motion.section
            key={spotlight.leader.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : index * 0.08 }}
            className={index % 2 === 0 ? "bg-background py-24 lg:py-28" : "border-y border-border bg-secondary/35 py-24 lg:py-28"}
          >
            <div className="container-editorial grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: spotlight.reverse ? 36 : -36 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`${textOrderClass} lg:col-span-7`}
              >
                <div className="eyebrow mb-5">{spotlight.eyebrow}</div>
                <div
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${theme.badge}`}
                >
                  {spotlight.leader.role}
                </div>
                <h2 className="mt-5 h-section text-4xl leading-tight text-foreground lg:text-5xl">
                  {spotlight.leader.name}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
                  {spotlight.leader.desc}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {spotlight.achievement.subtitle}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {spotlight.achievement.stats.map((stat) => (
                    <div key={stat.id} className="rounded-2xl border border-border bg-card/90 px-5 py-4">
                      <div className={`h-section text-2xl ${theme.accent}`}>{stat.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/achievements"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-deep"
                  >
                    View full achievements
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: spotlight.reverse ? -36 : 36, scale: 0.96 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`${imageOrderClass} lg:col-span-5`}
              >
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.35,
                  }}
                  className="overflow-hidden rounded-[32px] border border-border bg-white shadow-[0_22px_60px_-44px_rgba(15,23,42,0.48)]"
                >
                  <div className="aspect-[4/5] p-8 sm:p-10">
                    <motion.img
                      src={resolveImageSource(spotlight.leader.imageKey, spotlight.leader.imageUrl)}
                      alt={spotlight.leader.name}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={1000}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        );
      })}
    </>
  );
};
