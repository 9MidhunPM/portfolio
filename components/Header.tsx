"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_ITEMS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

function AvailabilityBadge({ mobileOnly = false }: { mobileOnly?: boolean }) {
  return (
    <Link
      href="/contact"
      className="flex items-center gap-2"
      aria-label="Open to internships — go to contact page"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {mobileOnly ? (
        <span className="sr-only">Open to internships - contact Midhun P M</span>
      ) : (
        <span className="font-mono text-[13px] text-muted transition-colors hover:text-foreground">
          Open to internships
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/90 backdrop-blur-sm transition-colors",
        scrolled && "border-b border-border"
      )}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-foreground"
          aria-label={`${SITE.name} — home`}
        >
          midhunpm<span className="text-muted">.</span>
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative font-mono text-[13px] text-muted transition-colors hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
          <AvailabilityBadge />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <AvailabilityBadge mobileOnly />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="animate-page-enter overflow-hidden border-b border-border bg-background md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1 px-5 py-4">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:bg-surface hover:text-foreground",
                      isActive && "bg-surface text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
