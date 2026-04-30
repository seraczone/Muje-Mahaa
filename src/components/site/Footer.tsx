import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/apc-logo.jpg";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { footerNavItems } from "@/components/site/navigation";

const renderTextLines = (text: string) =>
  text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < text.split("\n").length - 1 && <br />}
    </span>
  ));

export const Footer = () => {
  const { content } = useSiteContent();
  const contact = content.contact;
  const addressCard = contact.cards.find((card) => card.icon === "map-pin");
  const emailCard = contact.cards.find((card) => card.icon === "mail");
  const phoneCard = contact.cards.find((card) => card.icon === "phone");

  return (
    <footer id="footer" className="bg-primary-deep text-primary-foreground">
      <div className="container-editorial grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <div className="rounded-sm bg-white p-1.5">
              <img
                src={logo}
                alt="APC logo"
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div>
              <div className="h-display text-lg">Muje Maha Support Group</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">
                An APC Support Group
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/80">{contact.footerSummary}</p>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="social link"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60">Explore</div>
          <ul className="space-y-3 text-sm">
            {footerNavItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-primary-foreground/85 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60">Headquarters</div>
          <address className="not-italic text-sm leading-relaxed text-primary-foreground/85">
            {addressCard ? renderTextLines(addressCard.text) : "Muje Maha Support Group Secretariat"}
          </address>
          <div className="mt-5 space-y-1 text-sm text-primary-foreground/85">
            {emailCard && (
              <div>
                <a href={emailCard.href || `mailto:${emailCard.text}`} className="transition-colors hover:text-gold">
                  {emailCard.text}
                </a>
              </div>
            )}
            {phoneCard && (
              <div>
                <a href={phoneCard.href || `tel:${phoneCard.text}`} className="transition-colors hover:text-gold">
                  {phoneCard.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div>(c) {new Date().getFullYear()} Muje Maha Support Group. All rights reserved.</div>
          <div>Affiliated with the All Progressives Congress (APC) - Nasarawa State Chapter.</div>
        </div>
      </div>
    </footer>
  );
};
