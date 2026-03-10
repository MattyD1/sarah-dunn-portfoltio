import { linkGroup } from "@/fields/link-group";
import { Block } from "payload";

export const ArchiveBlock: Block = {
  slug: "archiveBlock",
  interfaceName: "ArchiveBlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
    {
      name: "populatedBy",
      type: "select",
      defaultValue: "selection",
      options: [
        {
          label: "Individual Selection",
          value: "selection",
        },
      ],
    },
    {
      name: "selectedDocs",
      type: "relationship",
      hasMany: true,
      label: "Selection",
      relationTo: ["products"],
    },
  ],
  labels: {
    plural: "Archives",
    singular: "Archive",
  },
};
