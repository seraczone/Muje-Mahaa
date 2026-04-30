import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { contentIconMap } from "@/lib/site-content";

const renderTextLines = (text: string) =>
  text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));

const ContactPage = () => {
  const { content } = useSiteContent();
  const contact = content.contact;

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container-editorial grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-5">{contact.eyebrow}</div>
          <h1 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{contact.heading}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{contact.description}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="h-11 rounded-sm bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-deep">
              <Link to="/join">Register as a supporter</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm px-6 font-semibold">
              <Link to="/donate">Support the movement</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:col-span-7">
          {contact.cards.map((card) => {
            const Icon = contentIconMap[card.icon];
            const clickable = !!card.href.trim();

            return (
              <article key={card.id} className="border border-border bg-card p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{card.title}</div>
                <div className="mt-3 text-sm leading-relaxed text-foreground/85">
                  {clickable ? (
                    <a href={card.href} className="transition-colors hover:text-primary">
                      {renderTextLines(card.text)}
                    </a>
                  ) : (
                    renderTextLines(card.text)
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
