import { Block } from "payload";

import { blockOptions } from "@/fields/block-options";
import { linkGroup } from "@/fields/link-group";

export const LinksBlock: Block = {
  slug: "linksBlock",
  interfaceName: "linksBlock",
  fields: [
    blockOptions(),
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    linkGroup({
      overrides: {
        minRows: 2,
        maxRows: 8,
      },
    }),
  ],
};
