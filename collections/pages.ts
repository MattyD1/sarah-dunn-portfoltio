import type { CollectionConfig } from "payload";

import { slugField } from "payload";
import { adminOnly } from "@/access/admin-only";
import { adminOrPublished } from "@/access/admin-or-published";
import { hero } from "@/heros/config";
import { ArchiveBlock } from "@/blocks/archive-block/config";
import { MediaBlock } from "@/blocks/media-block/config";
import { ContentBlock } from "@/blocks/content-block/config";
import { LinksBlock } from "@/blocks/links-block/configs";
import { colorField } from "@/fields/color-picker/field";

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
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [ArchiveBlock, MediaBlock, ContentBlock, LinksBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
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
    colorField({
      name: "pageColor",
      colorPresets: [],
      showTextInput: true,
      overrides: (field) => ({
        ...field,
        admin: {
          ...field.admin,
          position: "sidebar",
        },
      }),
    }),
    {
      name: "dark",
      label: "Dark Page",
      type: "checkbox",
      required: true,
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
