"use client";

import { useRef } from "react";
import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { motion, useScroll, useTransform } from "framer-motion";

import { Media } from "@/components/media";

export const MediaBlock: React.FC<MediaBlockProps & { id?: string }> = (
  props
) => {
  const { media } = props;

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative h-full w-full bg-black">
          <Media
            resource={media}
            fill
            alt="image"
            videoClassName="w-full"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </div>
  );
};
