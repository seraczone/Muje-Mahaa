import president from "@/assets/leader-president.jpg";
import governor from "@/assets/leader-governor.jpg";
import founder from "@/assets/leader-founder.jpg";

const LEADERS = [
  { img: president, role: "President", name: "Bola Ahmed Tinubu", desc: "President, Federal Republic of Nigeria. Architect of the Renewed Hope Agenda." },
  { img: governor, role: "Governor", name: "Nasarawa State", desc: "Driving development, security and prosperity across the state." },
  { img: founder, role: "Founder", name: "MUJE MAHA", desc: "Visionary behind a unified grassroots movement for Nasarawa progress." },
];

export const Leadership = () => {
  return (
    <section id="leadership" className="bg-background py-24 lg:py-32">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">Leadership</div>
          <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
            Principled leaders, shared purpose.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {LEADERS.map((l) => (
            <article key={l.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={l.img}
                  alt={l.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pt-6 border-t border-border mt-6">
                <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">{l.role}</div>
                <h3 className="h-section text-2xl mt-2 text-foreground">{l.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
