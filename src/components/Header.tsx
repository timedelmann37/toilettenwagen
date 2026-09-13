"use client";

import { useEffect, useRef, useState } from "react";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-8 xl:px-12">
        <Link
          href="/"
          className="flex items-center rounded-card transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={site.name}
        >
          <Image
            src="/logo.png"
            alt=""
            width={455}
            height={161}
            className="siteLogo brightness-0"
          />
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-4 xl:flex"
        >
          <NavList linkClassName="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-ink-soft underline-offset-8 transition-colors hover:text-ink hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" />
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/#kontakt" className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-5 text-sm font-semibold text-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Zum Anfrageformular</Link>
          <WhatsappButton size="sm" />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-4 text-sm font-semibold text-ink transition-colors hover:border-ink xl:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {open ? "Schließen" : "Menü"}
        </button>
      </div>

      <div className="flex justify-center gap-2 border-t border-line px-3 py-2 xl:hidden">
        <Link href="/#kontakt" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-3 text-xs font-semibold text-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Zum Anfrageformular</Link>
        <WhatsappButton size="sm" className="!gap-2 !px-3 !text-xs" />
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg xl:hidden">
          <nav
            aria-label="Hauptnavigation (mobil)"
            className="mx-auto flex max-w-[88rem] flex-col gap-1 px-4 py-3"
          >
            <NavList
              linkClassName="min-h-11 rounded-card px-3 py-2.5 text-base font-semibold text-ink hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onNavigate={() => setOpen(false)}
            />
            <WhatsappButton className="mt-2 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}
