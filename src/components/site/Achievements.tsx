import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Building2, Landmark, Users, Sprout, GraduationCap, ShieldCheck, HeartPulse } from "lucide-react";

type TabKey = "president" | "governor";

const DATA: Record<TabKey, {
  title: string;
  subtitle: string;
  accent: string;
  border: string;
  badge: string;
  items: { icon: React.ElementType; title: string; text: string }[];
  stats: { v: string; l: string }[];
}> = {
  president: {
    title: "President Bola Ahmed Tinubu",
    subtitle: "Renewed Hope Agenda — National Reform & Renewal",
    accent: "text-primary",
    border: "border-primary",
    badge: "bg-primary text-primary-foreground",
    items: [
      { icon: TrendingUp, title: "Economic Reform", text: "Subsidy reform and FX unification driving long-term fiscal stability." },
      { icon: Building2, title: "Infrastructure", text: "Coastal Highway, rail expansion and nationwide road revitalisation." },
      { icon: Landmark, title: "Investment", text: "Record FDI commitments across energy, tech and manufacturing." },
      { icon: ShieldCheck, title: "Security", text: "Strengthened intelligence operations and inter-agency coordination." },
    ],
    stats: [
      { v: "₦35tn", l: "2025 Budget" },
      { v: "700km", l: "Coastal Highway" },
      { v: "$30B+", l: "FDI Pledged" },
    ],
  },
  governor: {
    title: "Governor of Nasarawa State",
    subtitle: "Driving People-Centred Governance & Local Prosperity",
    accent: "text-rally",
    border: "border-rally",
    badge: "bg-rally text-destructive-foreground",
    items: [
      { icon: Sprout, title: "Agriculture", text: "Mechanised farming and farmer-input schemes expanding food security." },
      { icon: GraduationCap, title: "Education", text: "School renovations, scholarships and teacher recruitment statewide." },
      { icon: HeartPulse, title: "Healthcare", text: "Primary health centres revitalised across all 13 LGAs." },
      { icon: Users, title: "Community", text: "Direct empowerment programs reaching grassroots communities." },
    ],
    stats: [
      { v: "13", l: "LGAs Reached" },
      { v: "150+", l: "Health Centres" },
      { v: "10K+", l: "Empowered" },
    ],
  },
};

export const Achievements = () => {
  const [tab, setTab] = useState<TabKey>("president");
  const d = DATA[tab];

  return (
    <section id="achievements" className="bg-background py-24 lg:py-32">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">Track Record</div>
          <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
            Leadership Achievements
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            A record of reform and renewal — at the federal level and right here in Nasarawa State.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 inline-flex border border-border rounded-sm overflow-hidden">
          {(["president", "governor"] as TabKey[]).map((k) => {
            const active = tab === k;
            return (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`relative px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k === "president" ? "President" : "Governor"}
                {active && (
                  <motion.span
                    layoutId="tab-underline"
                    className={`absolute left-0 right-0 bottom-0 h-0.5 ${k === "president" ? "bg-primary" : "bg-rally"}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-10 grid lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <div className={`border-l-2 ${d.border} pl-6`}>
                <span className={`inline-block text-[10px] uppercase tracking-[0.2em] ${d.badge} px-2.5 py-1 rounded-sm`}>
                  {tab === "president" ? "Federal" : "Nasarawa State"}
                </span>
                <h3 className="h-section text-2xl lg:text-3xl mt-5 text-foreground leading-snug">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.subtitle}</p>

                <div className="mt-8 space-y-5">
                  {d.stats.map((s) => (
                    <div key={s.l} className="flex items-baseline justify-between border-b border-border pb-3">
                      <span className={`h-section text-2xl ${d.accent}`}>{s.v}</span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
              {d.items.map((it, i) => (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="group bg-card border border-border p-7 hover:border-foreground/30 hover:-translate-y-0.5 transition-all"
                >
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-sm bg-secondary ${d.accent}`}>
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h4 className="h-section text-xl mt-5 text-foreground">{it.title}</h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
