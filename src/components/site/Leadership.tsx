import coatOfArms from "@/assets/coat-of-arms.jpg";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { resolveImageSource, type LeaderItem } from "@/lib/site-content";

const splitLeaderName = (name: string) => {
  if (name.trim().endsWith(" GCFR")) {
    return {
      primary: name.trim().slice(0, -5),
      suffix: "GCFR",
    };
  }

  return {
    primary: name,
    suffix: "",
  };
};

const LeaderCard = ({ leader, featured = false }: { leader: LeaderItem; featured?: boolean }) => {
  const title = splitLeaderName(leader.name);
  const imagePadding = featured ? "p-8 sm:p-10" : "p-6 sm:p-7";

  return (
    <article
      className={`group overflow-hidden border border-border bg-card/95 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.48)] ${
        featured ? "rounded-[32px] p-5 sm:p-6" : "rounded-[28px] p-4 sm:p-5"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-white ${featured ? "aspect-[4/5] rounded-[28px]" : "aspect-[4/5] rounded-[24px]"}`}
      >
        <img
          src={resolveImageSource(leader.imageKey, leader.imageUrl)}
          alt={title.primary}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          className={`h-full w-full object-contain object-center ${imagePadding} transition-transform duration-700 group-hover:scale-[1.01]`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <img
          src={coatOfArms}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={56}
          height={56}
          className="absolute right-4 top-4 h-12 w-12 rounded-full bg-white/90 object-cover ring-1 ring-background/40 shadow-md"
        />
        <div className="absolute bottom-4 left-5 right-5 text-background">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-90">{leader.role}</div>
        </div>
      </div>

      <div className={`border-t border-border ${featured ? "mt-6 pt-6 text-center" : "mt-5 pt-5"}`}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{leader.role}</div>
        <div
          className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 ${featured ? "items-end justify-center" : "items-end"}`}
        >
          <h3 className={`h-section text-foreground ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
            {title.primary}
          </h3>
          {title.suffix ? (
            <span className="pb-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary/75 sm:text-sm">
              {title.suffix}
            </span>
          ) : null}
        </div>
        <p className={`mt-3 text-sm leading-relaxed text-muted-foreground ${featured ? "mx-auto max-w-2xl" : ""}`}>
          {leader.desc}
        </p>
      </div>
    </article>
  );
};

export const Leadership = () => {
  const { content } = useSiteContent();
  const leadership = content.leadership;
  const president = leadership.leaders.find((leader) => leader.id === "leader-president") ?? leadership.leaders[0];
  const supportingLeaders = leadership.leaders.filter((leader) => leader.id !== president?.id);

  return (
    <section id="leadership" className="bg-background py-24 lg:py-32">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">{leadership.eyebrow}</div>
          <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{leadership.heading}</h2>
        </div>

        {president ? (
          <div className="mx-auto mt-14 max-w-[32rem]">
            <LeaderCard leader={president} featured />
          </div>
        ) : null}

        {supportingLeaders.length ? (
          <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2 lg:mt-10">
            {supportingLeaders.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
