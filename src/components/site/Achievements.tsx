import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { contentIconMap, getThemeClasses } from "@/lib/site-content";

export const Achievements = () => {
  const { content } = useSiteContent();
  const sections = content.achievements.tabs;

  if (sections.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="bg-background py-24 lg:py-32">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">{content.achievements.eyebrow}</div>
          <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">
            {content.achievements.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{content.achievements.intro}</p>
        </div>

        <div className="mt-12 space-y-16 lg:space-y-20">
          {sections.map((section, sectionIndex) => {
            const theme = getThemeClasses(section.theme);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: sectionIndex * 0.08 }}
                className="grid gap-10 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <div className={`border-l-2 ${theme.border} pl-6`}>
                    <span
                      className={`inline-block rounded-sm px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${theme.badge}`}
                    >
                      {section.badgeLabel}
                    </span>
                    <h3 className="mt-5 h-section text-2xl leading-snug text-foreground lg:text-3xl">
                      {section.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.subtitle}</p>

                    <div className="mt-8 space-y-5">
                      {section.stats.map((stat) => (
                        <div key={stat.id} className="flex items-baseline justify-between border-b border-border pb-3">
                          <span className={`h-section text-2xl ${theme.accent}`}>{stat.value}</span>
                          <span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                  {section.items.map((item, index) => {
                    const Icon = contentIconMap[item.icon];

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.05 * index, duration: 0.4 }}
                        className="group overflow-hidden border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/30"
                      >
                        <div
                          className={`relative flex h-20 items-center justify-between border-b border-border bg-gradient-to-br ${theme.gradient} px-6`}
                        >
                          <div
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-sm bg-background ring-1 ring-border ${theme.accent}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            <BadgeCheck className={`h-3.5 w-3.5 ${theme.accent}`} />
                            Verified
                          </div>
                        </div>
                        <div className="p-7 pt-6">
                          <h4 className="h-section text-xl text-foreground">{item.title}</h4>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
