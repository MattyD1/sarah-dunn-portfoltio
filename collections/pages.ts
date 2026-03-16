import { hero } from "@/heros/config";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { generatePreviewPath } from "@/lib/generate-preview-path";
import { populatePublishedAt } from "@/hooks/populate-published-at";
import { revalidateDelete, revalidatePage } from "@/hooks/revalidate-page";
import { adminOnly } from "@/access/admin-only";
import { adminOrPublished } from "@/access/admin-or-published";
import { ArchiveBlock } from "@/blocks/archive-block/config";
import { ContentBlock } from "@/blocks/content-block/config";
import { LinksBlock } from "@/blocks/links-block/config";
import { MediaBlock } from "@/blocks/media-block/config";
import { paletteField } from "@/fields/color-palette/field";
import { colorField } from "@/fields/color-picker/field";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublished,
    update: adminOnly,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "pages",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "pages",
        req,
      }),
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
          name: "theme",
          label: "Theme",
          fields: [
            {
              type: "group",
              label: "Theme Options",
              fields: [
                colorField({
                  name: "accentColor",
                  colorPresets: [],
                  overrides: (field) => ({
                    ...field,
                    label: "Accent",
                  }),
                }),
                colorField({
                  name: "grayColor",
                  colorPresets: [],
                  overrides: (field) => ({
                    ...field,
                    label: "Grey",
                  }),
                }),
                colorField({
                  name: "backgroundColor",
                  colorPresets: [],
                  overrides: (field) => ({
                    ...field,
                    label: "Background",
                  }),
                }),
                {
                  name: "dark",
                  label: "Dark Page",
                  type: "checkbox",
                  defaultValue: false,
                  required: true,
                },
              ],
            },
            paletteField(),
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
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
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
    beforeChange: [populatePublishedAt],
  },
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
