export const About = () => {
  return (
    <section id="about" className="bg-secondary/40 py-24 lg:py-32 border-y border-border">
      <div className="container-editorial grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-5">About Us</div>
          <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
            A grassroots force for a stronger Nasarawa.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-8">
          <div className="border-l-2 border-primary pl-6">
            <p className="text-lg text-foreground/85 leading-relaxed">
              MUJE MAHA is an APC support group rooted in the people of Nasarawa State.
              We mobilise, organise and advocate for policies that uplift our
              communities — championing the values of progress, integrity and unity.
            </p>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              From the smallest ward to the highest office, we believe credible
              leadership and grassroots action can transform Nigeria. We stand with the
              President and the Governor in delivering the Renewed Hope Agenda.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            {[
              { v: "2019", l: "Founded" },
              { v: "13", l: "LGAs Active" },
              { v: "50K+", l: "Supporters" },
            ].map((s) => (
              <div key={s.l} className="border-t border-border pt-5">
                <div className="h-section text-3xl text-primary">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
