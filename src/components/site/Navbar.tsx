import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/apc-logo.png";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Achievements", href: "#achievements" },
  { label: "Leadership", href: "#leadership" },
  { label: "Objectives", href: "#objectives" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#footer" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_hsl(var(--border)),0_8px_24px_-12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="container-editorial flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="APC logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <div className="h-display text-base sm:text-lg text-foreground">MUJE MAHA</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">APC • Nasarawa State</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="bg-primary hover:bg-primary-deep text-primary-foreground rounded-sm px-6 h-10 font-semibold">
            <a href="#donate">Donate</a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-editorial py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground/80 border-b border-border last:border-0"
              >
                {n.label}
              </a>
            ))}
            <Button asChild className="mt-3 bg-primary hover:bg-primary-deep text-primary-foreground rounded-sm h-11">
              <a href="#donate" onClick={() => setOpen(false)}>Donate</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
