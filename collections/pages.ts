import type { CollectionConfig } from "payload";

import { slugField } from "payload";
import { adminOnly } from "@/access/admin-only";
import { adminOrPublished } from "@/access/admin-or-published";
import { hero } from "@/heros/config";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublished,
    update: adminOnly,
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "publishedOn",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
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
    slugField(),
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
