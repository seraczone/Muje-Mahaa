import { Target, Users, Megaphone, BookOpen, HandHeart, Vote } from "lucide-react";

const ITEMS = [
  { icon: Vote, title: "Civic Engagement", text: "Mobilising voters and strengthening democratic participation across all 13 LGAs." },
  { icon: Users, title: "Grassroots Unity", text: "Building cohesive ward-level structures rooted in trust and shared purpose." },
  { icon: HandHeart, title: "Community Impact", text: "Empowerment programs that reach families, women and youth directly." },
  { icon: Megaphone, title: "Policy Advocacy", text: "Amplifying the voice of Nasarawa in the national reform conversation." },
  { icon: BookOpen, title: "Political Education", text: "Equipping members with the principles of progressive, accountable leadership." },
  { icon: Target, title: "Strategic Support", text: "Standing firmly with the APC, the President and the Governor of Nasarawa." },
];

export const Objectives = () => {
  return (
    <section id="objectives" className="bg-secondary/40 border-y border-border py-24 lg:py-32">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <div className="eyebrow mb-5">Our Objectives</div>
          <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
            What we stand for.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="bg-background p-8 hover:bg-card transition-colors group"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="h-section text-xl mt-6 text-foreground">{it.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
