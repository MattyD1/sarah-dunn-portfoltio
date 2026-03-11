import { RichText } from "@/components/rich-text";
import type { ContentBlock as ContentBlockProps } from "@/payload-types";

export const ContentBlock: React.FC<ContentBlockProps & { id?: string }> = (
  props,
) => {
  const { id, richText } = props;

  return (
    <div className="my-16 mx-32" id={`block-${id}`}>
      {richText && <RichText data={richText} enableProse />}
    </div>
  );
};
