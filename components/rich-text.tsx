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
import { LinkBlock } from "@/payload-types";
import {
  LayoutsJSXConverter,
  ExpandedJSXConverter,
} from "@/plugins/converters";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<LinkBlock>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LayoutsJSXConverter,
  ...ExpandedJSXConverter,
  blocks: {
    linkBlock: ({ node }) => <CMSLink {...node.fields.link} />,
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
    "mx-auto max-w-4xl",
    "prose prose-invert prose-p:mix-blend-difference prose-headings:mix-blend-difference",
    "lg:prose-lg",
    "prose-h2:font-light prose-h2:capitalize prose-h2:tracking-wider",
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
