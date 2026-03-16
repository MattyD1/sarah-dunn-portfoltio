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
    "prose lg:prose-lg",
    "prose-headings:text-(--accent-twelve) prose-p:text-(--accent-twelve)",
    "prose-headings:font-light prose-headings:tracking-wider prose-headings:capitalize"
  );

  return (
    <div
      className={cn("text-(--accent-twelve)", {
        "px-32 py-32": container === "default",
        [proseClass]: container === "prose",
        "bg-linear-to-t": gradient === "linear",
        "bg-radial-[at_50%_100%]": gradient === "radial",
        "from-(--accent-one) to-black/0": gradient !== "none",
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
    >
      {children}
    </div>
  );
};
