import { MarqueeBlock as MarqueeBlockProps } from "@/payload-types";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

export const MarqueeBlock: React.FC<MarqueeBlockProps & { id?: string }> = (
  props
) => {
  const { repeat, reversed, pausedOnHover, textArray } = props;

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
    >
      {Array.isArray(textArray) && textArray.length > 0 && (
        <Marquee
          reverse={reversed === "true"}
          pauseOnHover={pausedOnHover || undefined}
          repeat={repeat}
        >
          {textArray.map(({ text }, i) => (
            <p
              key={i}
              className={cn(
                "px-8 text-4xl font-light tracking-wider text-(--accent-seven)"
              )}
            >
              {text}
            </p>
          ))}
        </Marquee>
      )}
      {/*<div className="from-[#C4C9C9] pointer-events-none absolute inset-y-0 left-0 w-1/4 mask-linear-to-r"></div>
      <div className="from-[#C4C9C9] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>*/}
    </div>
  );
};
