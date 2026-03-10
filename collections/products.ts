import { CollectionConfig } from "payload";

export const Products: CollectionConfig<"products"> = {
  slug: "products",
  admin: {
    group: "Content",
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "featureImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "description",
              type: "richText",
              label: false,
              required: false,
            },
          ],
        },
      ],
    },
  ],
};
