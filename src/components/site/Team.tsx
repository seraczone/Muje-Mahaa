import { motion, useReducedMotion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { contentIconMap } from "@/lib/site-content";

const teamThemes = [
  {
    accent: "text-primary",
    border: "border-primary/20 hover:border-primary/40",
    icon: "bg-primary/12 text-primary",
    pill: "bg-primary/10 text-primary",
    surface: "from-primary/14 via-white to-primary/5",
  },
  {
    accent: "text-rally",
    border: "border-rally/20 hover:border-rally/40",
    icon: "bg-rally/12 text-rally",
    pill: "bg-rally/10 text-rally",
    surface: "from-rally/14 via-white to-rally/5",
  },
  {
    accent: "text-gold",
    border: "border-gold/30 hover:border-gold/45",
    icon: "bg-gold/18 text-gold",
    pill: "bg-gold/16 text-gold",
    surface: "from-gold/18 via-white to-gold/5",
  },
];

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Team = () => {
  const { content } = useSiteContent();
  const leadership = content.leadership;
  const shouldReduceMotion = useReducedMotion();

  if (!leadership.teamHeading && leadership.teamMembers.length === 0) {
    return null;
  }

  return (
    <section id="team" className="border-t border-border bg-secondary/35 py-24 lg:py-32">
      <div className="container-editorial">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-5">{leadership.teamEyebrow}</div>
          <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{leadership.teamHeading}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{leadership.teamDescription}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {leadership.teamMembers.map((member, index) => {
            const Icon = contentIconMap[member.icon];
            const theme = teamThemes[index % teamThemes.length];

            return (
              <motion.article
                key={member.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: revealEase }}
                className={`group relative overflow-hidden rounded-[30px] border bg-card/95 p-8 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.5)] sm:p-10 ${theme.border}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.surface}`} />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${theme.pill}`}
                      >
                        {member.role}
                      </div>
                      <h3 className="mt-5 h-section text-3xl leading-tight text-foreground">{member.name}</h3>
                    </div>

                    <motion.div
                      animate={shouldReduceMotion ? undefined : { rotate: [0, -4, 4, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.25,
                      }}
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${theme.icon}`}
                    >
                      <Icon className={`h-7 w-7 ${theme.accent}`} />
                    </motion.div>
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">{member.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
