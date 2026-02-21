import { linkGroup } from "@/fields/link-group";
import { Field } from "payload";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      label: "Type",
      required: true,
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
      ],
    },
    {
      name: "richText",
      type: "richText",
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      label: "Featured Work",
      relationTo: "media",
      required: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
    },
  ],
  label: false,
};
