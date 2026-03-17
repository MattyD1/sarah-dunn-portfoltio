import { Block } from "payload";

import { customRowLabel } from "@/components/array-row-label/utility";

export const MarqueeBlock: Block = {
  slug: "marqueeBlock",
  interfaceName: "MarqueeBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          type: "radio",
          name: "reversed",
          required: true,
          defaultValue: "false",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
          admin: {
            width: "50%",
          },
        },
        {
          type: "checkbox",
          name: "pausedOnHover",
          defaultValue: false,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "number",
      name: "repeat",
      required: true,
      label: "Number of repitions",
      defaultValue: 5,
      min: 1,
      max: 999,
    },
    {
      type: "array",
      name: "textArray",
      minRows: 3,
      maxRows: 10,
      fields: [
        {
          type: "text",
          name: "text",
          label: false,
        },
      ],
      admin: {
        ...customRowLabel({ fieldToUse: "text" }),
      },
    },
  ],
};
