import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/apc-logo.png";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-primary-deep text-primary-foreground">
      <div className="container-editorial py-16 lg:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-sm p-1.5">
              <img src={logo} alt="APC logo" width={36} height={36} className="h-9 w-9 object-contain" />
            </div>
            <div>
              <div className="h-display text-lg">MUJE MAHA</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">An APC Support Group</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/80 leading-relaxed max-w-md">
            A united movement for progress in Nasarawa State. Proudly affiliated with the
            All Progressives Congress (APC) and aligned with the Renewed Hope Agenda.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="h-10 w-10 inline-flex items-center justify-center border border-white/20 hover:border-gold hover:text-gold transition-colors rounded-sm"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60 mb-5">Explore</div>
          <ul className="space-y-3 text-sm">
            {["About", "Achievements", "Leadership", "Objectives", "Gallery", "Donate"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-primary-foreground/85 hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60 mb-5">Headquarters</div>
          <address className="not-italic text-sm text-primary-foreground/85 leading-relaxed">
            MUJE MAHA Secretariat<br />
            Lafia, Nasarawa State<br />
            Federal Republic of Nigeria
          </address>
          <div className="mt-5 text-sm text-primary-foreground/85">
            <div>info@mujemaha.org</div>
            <div className="mt-1">+234 800 000 0000</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-editorial py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} MUJE MAHA. All rights reserved.</div>
          <div>Affiliated with the All Progressives Congress (APC) — Nasarawa State Chapter.</div>
        </div>
      </div>
    </footer>
  );
};
