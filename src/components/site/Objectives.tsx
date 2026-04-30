import { motion, useReducedMotion } from "framer-motion";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { contentIconMap } from "@/lib/site-content";

const objectiveThemes = [
  {
    accent: "text-primary",
    bar: "bg-primary",
    beam: "from-transparent via-primary/70 to-transparent",
    border: "border-primary/20 hover:border-primary/40",
    icon: "bg-primary text-primary-foreground shadow-[0_18px_40px_-24px_rgba(24,100,53,0.8)]",
    surface: "from-primary/18 via-white to-primary/5",
  },
  {
    accent: "text-rally",
    bar: "bg-rally",
    beam: "from-transparent via-rally/70 to-transparent",
    border: "border-rally/20 hover:border-rally/40",
    icon: "bg-rally text-white shadow-[0_18px_40px_-24px_rgba(180,39,45,0.78)]",
    surface: "from-rally/16 via-white to-rally/5",
  },
  {
    accent: "text-gold",
    bar: "bg-gold",
    beam: "from-transparent via-gold/80 to-transparent",
    border: "border-gold/25 hover:border-gold/45",
    icon: "bg-gold text-black shadow-[0_18px_40px_-24px_rgba(197,158,52,0.88)]",
    surface: "from-gold/18 via-white to-gold/5",
  },
];

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Objectives = () => {
  const { content } = useSiteContent();
  const objectives = content.objectives;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="objectives" className="border-y border-border bg-secondary/40 py-24 lg:py-32">
      <div className="container-editorial">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: revealEase }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-5">{objectives.eyebrow}</div>
          <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{objectives.heading}</h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {objectives.items.map((item, index) => {
            const Icon = contentIconMap[item.icon];
            const theme = objectiveThemes[index % objectiveThemes.length];

            return (
              <motion.article
                key={item.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28, scale: 0.97 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.01 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : index * 0.08, ease: revealEase }}
                className={`group relative overflow-hidden rounded-[30px] border bg-card/95 p-8 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.45)] transition-shadow hover:shadow-[0_30px_80px_-42px_rgba(15,23,42,0.55)] sm:p-10 lg:min-h-[320px] ${theme.border}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.surface}`} />
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${theme.beam}`} />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                      transition={{
                        duration: 5.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${theme.icon}`}
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/75">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-10 flex-1">
                    <div className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${theme.accent}`}>
                      Mission Pillar
                    </div>
                    <h3 className="mt-4 h-section text-2xl leading-tight text-foreground lg:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>

                  <div className={`mt-8 h-1.5 w-20 rounded-full ${theme.bar}`} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
