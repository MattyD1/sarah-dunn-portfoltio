import { GlobalConfig } from "payload";

import { linkGroup } from "@/fields/link-group";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      type: "group",
      label: "General Information",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "contactInfo",
          label: "Contact Information",
          type: "text",
        },
        linkGroup({
          appearances: ["icon"],
          overrides: {
            name: "socials",
          },
        }),
      ],
    },
    {
      name: "navItems",
      label: "Footer Navigation",
      type: "array",
      maxRows: 4,
      fields: [
        {
          name: "groupName",
          type: "text",
          required: true,
        },
        linkGroup({
          appearances: false,
          overrides: {
            maxRows: 6,
          },
        }),
      ],
    },
  ],
};
