import Image, { type ImageProps } from "next/image";

type VehicleImageProps = Omit<ImageProps, "src" | "width" | "height">;

export function VehicleImage({ alt, ...props }: VehicleImageProps) {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="/fotos/wagen-s-hero-960.webp"
      />
      <Image
        {...props}
        alt={alt}
        src="/fotos/wagen-s-hero-1600.webp"
        width={1600}
        height={1229}
      />
    </picture>
  );
}
