import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";

type Props = {
  /** kompakt = Header-Variante */
  size?: "sm" | "md";
  className?: string;
};

/** Primärer Anfrageweg: WhatsApp. Öffnet den Unternehmens-WhatsApp-Chat. */
export function WhatsappButton({ size = "md", className = "" }: Props) {
  const pad = size === "sm" ? "min-h-11 px-5 py-2.5 text-sm" : "min-h-12 px-6 py-3 text-base";
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex ${pad} items-center justify-center gap-3 whitespace-nowrap rounded-full bg-whatsapp font-semibold leading-tight text-white transition-colors duration-150 hover:bg-whatsapp-strong active:bg-whatsapp-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp motion-reduce:transition-none ${className}`}
    >
      <WhatsappLogo aria-hidden="true" weight="regular" className="size-6 shrink-0" />
      Per WhatsApp anfragen
    </a>
  );
}
