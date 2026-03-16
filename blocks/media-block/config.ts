import type { Block } from "payload";

import { blockOptions } from "@/fields/block-options";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  fields: [
    blockOptions(),
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
