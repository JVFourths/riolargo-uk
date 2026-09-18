import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlateProps {
  src: string;
  alt: string;
  number: string;
  caption: string;
  sizes: string;
  /** Tailwind aspect class for the image window. */
  aspect?: string;
  arched?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/** A captioned photograph in a double hairline frame, like a botanical print. */
export function Plate({
  src,
  alt,
  number,
  caption,
  sizes,
  aspect = "aspect-[4/5]",
  arched = true,
  priority = false,
  className,
  imageClassName,
}: PlateProps) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "border border-rule bg-paper-raised p-2 shadow-plate",
          arched && "rounded-arch"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden border border-rule-strong",
            aspect,
            arched && "rounded-arch"
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-cover", imageClassName)}
          />
        </div>
      </div>
      <figcaption className="mt-4 flex items-baseline gap-3 text-ink-muted">
        <span className="label shrink-0">Plate {number}</span>
        <span className="font-display text-lg italic leading-snug">{caption}</span>
      </figcaption>
    </figure>
  );
}
