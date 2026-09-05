"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { WhatsappButton } from "./WhatsappButton";

/** Die Ankerlinks – einmal definiert, in Desktop- und Mobil-Nav wiederverwendet. */
function NavList({
  linkClassName,
  onNavigate,
}: {
  linkClassName: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={linkClassName}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <Image
            src="/logo.png"
            alt={site.name}
            width={455}
            height={161}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-7 md:flex"
        >
          <NavList linkClassName="text-sm font-medium text-ink-soft transition-colors hover:text-ink" />
        </nav>

        <div className="hidden md:block">
          <WhatsappButton size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-card text-ink md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth={2} aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <nav
            aria-label="Hauptnavigation (mobil)"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3"
          >
            <NavList
              linkClassName="rounded-card px-2 py-2 text-base font-medium text-ink hover:bg-surface"
              onNavigate={() => setOpen(false)}
            />
            <WhatsappButton className="mt-2 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}
