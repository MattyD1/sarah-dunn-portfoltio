"use client";

import type { Props as MediaProps } from "./types";
import { getMediaUrl } from "@/lib/get-media-url";
import { cn } from "@/lib/utils";

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props;

  if (!resource) return null;
  if (typeof resource !== "object") return null;

  const { url } = resource;

  console.log(getMediaUrl(url));

  return (
    <video
      autoPlay
      className={cn(videoClassName)}
      controls={false}
      loop
      muted
      onClick={onClick}
      playsInline
    >
      <source src={getMediaUrl(url)} />
    </video>
  );
};
