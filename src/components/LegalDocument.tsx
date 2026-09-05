import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./LegalDocument.module.css";

type LegalSectionLink = {
  href: `#${string}`;
  label: string;
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  updatedAt: string;
  sections: readonly LegalSectionLink[];
  children: ReactNode;
};

export function LegalDocument({
  title,
  intro,
  updatedAt,
  sections,
  children,
}: LegalDocumentProps) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link className={styles.backLink} href="/">
            Zur Startseite
          </Link>
          <h1>{title}</h1>
          <p>{intro}</p>
          <span className={styles.updated}>Stand: {updatedAt}</span>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.rail}>
          <nav aria-label={`Inhalt von ${title}`}>
            <p>Auf dieser Seite</p>
            <ol>
              {sections.map((section) => (
                <li key={section.href}>
                  <a href={section.href}>{section.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.contact}>
            <p>Direkter Kontakt</p>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </aside>

        <div className={styles.content}>{children}</div>
      </div>
    </article>
  );
}
