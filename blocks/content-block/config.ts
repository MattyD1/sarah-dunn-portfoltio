import { linkGroup } from "@/fields/link-group";
import { LayoutsFeature } from "@/plugins/lexical-layouts";
import {
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const ContentBlock: Block = {
  slug: "contentBlock",
  fields: [
    {
      name: "richText",
      type: "richText",
      label: "false",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            BlocksFeature({
              blocks: [
                {
                  slug: "links",
                  fields: [linkGroup()],
                },
              ],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            LayoutsFeature(),
          ];
        },
      }),
    },
  ],
};
