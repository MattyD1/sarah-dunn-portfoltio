import type { ContentBlock as ContentBlockProps } from "@/payload-types";

import { RichText } from "@/components/rich-text";

export const ContentBlock: React.FC<ContentBlockProps & { id?: string }> = (
  props
) => {
  const { id, richText } = props;

  return (
    <div id={`block-${id}`}>{richText && <RichText data={richText} />}</div>
  );
};
