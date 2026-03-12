import { cn } from "@/lib/utils";

type BlockContainerType = {
  backgroundColor?: string | null;
  gradient?: "linear" | "radial" | "none" | null;
  container?: "prose" | "full" | "default" | null;
  children?: React.ReactNode;
};

export const BlockContainer: React.FC<BlockContainerType> = (props) => {
  const { backgroundColor, gradient, container, children } = props;

  const proseClass = cn(
    "mx-auto py-16",
    "prose prose-invert lg:prose-lg",
    "prose-p:mix-blend-difference prose-headings:mix-blend-difference",
    "prose-headings:font-light prose-headings:capitalize prose-headings:tracking-wider",
  );

  return (
    <div
      className={cn("text-white", {
        "py-32 px-32": container === "default",
        [proseClass]: container === "prose",
        "bg-linear-to-t": gradient === "linear",
        "bg-radial-[at_50%_100%] ": gradient === "radial",
        "from-[#C4C9C9] to-black/0": gradient !== "none",
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
    >
      {children}
    </div>
  );
};
