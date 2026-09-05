import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="max-w-xs font-semibold text-ink">{site.legalName}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {site.address.street}
            <br />
            {site.address.city}
          </p>
        </div>

        <div className="text-sm text-ink-soft">
          <p className="font-medium text-ink">Kontakt</p>
          <p className="mt-2">
            <a href={site.phoneHref} className="hover:text-ink">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              {site.email}
            </a>
          </p>
          <dl className="mt-3 space-y-0.5">
            {site.hours.map((h) => (
              <div key={h.days} className="flex gap-2">
                <dt className="min-w-12 font-medium text-ink">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="text-sm text-ink-soft">
          <p className="font-medium text-ink">Rechtliches</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/impressum/" className="hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz/" className="hover:text-ink">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-soft sm:px-6">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
