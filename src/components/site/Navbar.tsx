import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/apc-logo.jpg";
import { NavLink } from "@/components/NavLink";
import { navbarNavItems } from "@/components/site/navigation";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_hsl(var(--border)),0_8px_24px_-12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="APC logo"
            width={40}
            height={40}
            fetchPriority="high"
            decoding="async"
            className="h-10 w-10 object-contain"
          />
          <div className="max-w-[13rem] leading-tight">
            <div className="h-display text-sm text-foreground sm:text-base lg:text-lg">
              <span className="block whitespace-nowrap">Muje Maha</span>
              <span className="block whitespace-nowrap">Support Group</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              APC | Nasarawa State
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navbarNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              activeClassName="text-primary"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <Button asChild className="h-10 rounded-sm bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-deep">
              <Link to="/donate">Donate</Link>
            </Button>
          </div>
        </div>

        <button
          aria-label="Toggle menu"
          className="-mr-2 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-editorial flex flex-col gap-1 py-4">
            {navbarNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                activeClassName="text-primary"
                className="border-b border-border py-3 text-sm font-medium text-foreground/80 last:border-0"
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild className="mt-3 h-11 rounded-sm bg-primary text-primary-foreground hover:bg-primary-deep">
              <Link to="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
