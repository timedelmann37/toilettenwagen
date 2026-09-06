import Image, { type ImageProps } from "next/image";
import type { TrailerModelId } from "@/lib/models";

type VehicleImageProps = Omit<ImageProps, "src" | "width" | "height"> & {
  model?: TrailerModelId;
};

const vehicleAssets = {
  s: {
    desktop: "/fotos/wagen-s-hero-1600.webp",
    mobile: "/fotos/wagen-s-hero-960.webp",
    width: 1600,
    height: 1229,
  },
  m: {
    desktop: "/fotos/wagen-m-model-1600.webp",
    mobile: "/fotos/wagen-m-model-960.webp",
    width: 1283,
    height: 903,
  },
  l: {
    desktop: "/fotos/wagen-l-model-1600.webp",
    mobile: "/fotos/wagen-l-model-960.webp",
    width: 1360,
    height: 798,
  },
} satisfies Record<
  TrailerModelId,
  { desktop: string; mobile: string; width: number; height: number }
>;

export function VehicleImage({ model = "s", alt, ...props }: VehicleImageProps) {
  const asset = vehicleAssets[model];

  return (
    <picture data-vehicle-model={model}>
      <source media="(max-width: 767px)" srcSet={asset.mobile} />
      <Image
        {...props}
        alt={alt}
        src={asset.desktop}
        width={asset.width}
        height={asset.height}
      />
    </picture>
  );
}
