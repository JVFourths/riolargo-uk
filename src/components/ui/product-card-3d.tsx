"use client";

import { useRef, useState } from "react";
import { m } from "motion/react";
import Image from "next/image";

interface ProductCard3DProps {
  image: string;
  alt: string;
  sizes?: string;
}

export function ProductCard3D({ image, alt, sizes }: ProductCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightX, setLightX] = useState(50);
  const [lightY, setLightY] = useState(50);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((0.5 - y) * 10);
    setRotateY((x - 0.5) * 10);
    setLightX(x * 100);
    setLightY(y * 100);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setLightX(50);
    setLightY(50);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[3/4] overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <m.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Ambient glow behind bottle */}
        <div
          className="absolute inset-[15%] rounded-full blur-[80px] opacity-40 transition-all duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(201, 168, 76, 0.5), rgba(107, 142, 58, 0.2), transparent 70%)`,
          }}
        />

        {/* Product image */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          />
        </div>

        {/* Cylindrical lighting — vertical highlight strip + edge shadows */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-50"
          style={{
            background: `linear-gradient(
              to right,
              rgba(0,0,0,0.6) 0%,
              rgba(0,0,0,0.25) 15%,
              transparent 30%,
              rgba(255,255,255,0.15) ${lightX * 0.6 + 20}%,
              transparent 70%,
              rgba(0,0,0,0.25) 85%,
              rgba(0,0,0,0.6) 100%
            )`,
          }}
        />

        {/* Specular highlight that follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse 30% 50% at ${lightX}% ${lightY}%, rgba(255,255,255,0.5), transparent 70%)`,
          }}
        />
      </m.div>

      {/* Floor shadow / reflection */}
      <div className="absolute -bottom-2 left-[20%] right-[20%] h-8 bg-accent/10 blur-[20px] rounded-full" />
    </div>
  );
}
