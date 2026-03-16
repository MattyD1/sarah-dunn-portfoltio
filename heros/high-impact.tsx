"use client";

import { useRef } from "react";
import { Page } from "@/payload-types";
import { motion, useScroll, useTransform } from "framer-motion";

import { CMSLink } from "@/components/link";
import { Media } from "@/components/media";
import { RichText } from "@/components/rich-text";

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  richText,
  media,
  backgroundImage,
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Reduce travel distance — large ranges cause more repaints
  const transform = useTransform(scrollYProgress, [0.5, 1], [80, -80]);

  return (
    <div
      ref={container}
      className="relative flex h-screen px-6 text-(--accent-twelve)"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {backgroundImage && (
          <Media
            fill
            imgClassName="w-full h-full object-cover"
            resource={backgroundImage}
          />
        )}
        {/* Gradient overlay — replaces CSS mask */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--accent-one)" />
      </div>

      <div className="z-10 flex flex-col justify-center gap-12">
        {richText && (
          <RichText
            data={richText}
            className="text-9xl leading-[1.2] font-light tracking-[10]"
          />
        )}
        <div>
          {Array.isArray(links) && links.length > 0 && (
            <ul>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Parallax Image — pure CSS, zero JS */}
      <motion.div
        style={{
          translateY: transform, // translateY instead of y — skips layout recalc
          willChange: "transform", // promotes to GPU layer early
        }}
        className="parallax-image absolute right-14 bottom-0 z-20 w-1/3"
      >
        <Media
          imgClassName="w-full h-auto object-contain border-2 border-white rounded-lg shadow-image"
          priority
          resource={media}
        />
      </motion.div>
    </div>
  );
};
