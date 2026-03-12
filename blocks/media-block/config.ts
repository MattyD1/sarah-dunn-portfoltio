import { blockOptions } from "@/fields/block-options";
import type { Block } from "payload";

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
