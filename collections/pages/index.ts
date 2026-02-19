import { CollectionConfig } from "payload";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
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
          fields: [],
          label: "Hero",
        },
        {
          fields: [],
          label: "Content",
        },
        {
          fields: [],
          name: "meta",
          label: "SEO",
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
