import { Block } from "payload";

import { blockOptions } from "@/fields/block-options";

export const ContentBlock: Block = {
  slug: "contentBlock",
  interfaceName: "ContentBlock",
  fields: [
    blockOptions(),
    {
      name: "richText",
      type: "richText",
      label: false,
    },
  ],
};
