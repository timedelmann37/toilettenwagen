import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";

type Props = {
  /** kompakt = Header-Variante */
  size?: "sm" | "md";
  className?: string;
};

/** Primärer Anfrageweg: WhatsApp. Öffnet den Unternehmens-WhatsApp-Chat. */
export function WhatsappButton({ size = "md", className = "" }: Props) {
  const pad = size === "sm" ? "h-11 px-5 text-sm" : "h-12 px-6 text-base";
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex ${pad} items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-whatsapp font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-whatsapp-strong active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp ${className}`}
    >
      <WhatsappLogo aria-hidden="true" weight="fill" className="size-5 shrink-0" />
      Per WhatsApp anfragen
    </a>
  );
}
