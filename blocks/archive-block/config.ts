import { blockOptions } from "@/fields/block-options";
import { colorField } from "@/fields/color-picker/field";
import { linkGroup } from "@/fields/link-group";
import { Block } from "payload";

export const ArchiveBlock: Block = {
  slug: "archiveBlock",
  interfaceName: "ArchiveBlock",
  fields: [
    blockOptions(),
    {
      type: "group",
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
      ],
    },
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
    colorField({
      name: "archiveBackground",
      showTextInput: true,
      overrides: (field) => ({
        ...field,
        admin: {
          ...field.admin,
          width: "50%",
        },
      }),
    }),
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
