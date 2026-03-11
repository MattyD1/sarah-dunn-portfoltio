import { cn } from "@/lib/utils";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText as PayloadRichText,
} from "@payloadcms/richtext-lexical/react";
import { CMSLink } from "./link";
import {
  LinkBlock,
  MarqueeBlock as MarqueeBlockProps,
  MediaBlock as MediaBlockProps,
} from "@/payload-types";
import {
  LayoutsJSXConverter,
  ExpandedJSXConverter,
} from "@/plugins/converters";
import { MarqueeBlock } from "@/blocks/marquee-block/component";
import { Media } from "./media";
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<LinkBlock | MarqueeBlockProps | MediaBlockProps>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LayoutsJSXConverter,
  ...ExpandedJSXConverter,
  upload: ({ node }) => {
    const { value } = node;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      (typeof value === "object" && value !== null && "url" in value)
    ) {
      return (
        <Media
          resource={value}
          pictureClassName="w-full h-full flex items-center justify-center"
          imgClassName="max-w-full max-h-full h-auto w-auto object-fit-contain border-2 border-white rounded-lg shadow-image"
        />
      );
    }

    return null;
  },
  blocks: {
    linkBlock: ({ node }) => <CMSLink {...node.fields.link} />,
    marqueeBlock: ({ node }) => <MarqueeBlock {...node.fields} />,
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText: React.FC<Props> = (props) => {
  const {
    className,
    enableProse = false,
    enableGutter = true,
    ...rest
  } = props;

  const proseClass = cn(
    "mx-auto",
    "prose prose-invert lg:prose-lg",
    "prose-p:mix-blend-difference prose-headings:mix-blend-difference",
    "prose-headings:font-light prose-headings:capitalize prose-headings:tracking-wider",
    className,
  );

  return (
    <PayloadRichText
      converters={jsxConverters}
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          [proseClass]: enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
};
