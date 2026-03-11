import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { MarqueeBlock as MarqueeBlockProps } from "@/payload-types";

export const MarqueeBlock: React.FC<MarqueeBlockProps & { id?: string }> = (
  props,
) => {
  const { repeat, reversed, pausedOnHover, textArray } = props;

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {Array.isArray(textArray) && textArray.length > 0 && (
        <Marquee
          reverse={reversed === "true"}
          pauseOnHover={pausedOnHover || undefined}
          repeat={repeat}
          className="mix-blend-difference"
        >
          {textArray.map(({ text }, i) => (
            <p
              key={i}
              className={cn(
                "text-5xl font-light tracking-wider text-white/25 px-8",
              )}
            >
              {text}
            </p>
          ))}
        </Marquee>
      )}
      <div className="from-[#C4C9C9] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r "></div>
      <div className="from-[#C4C9C9] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
};
