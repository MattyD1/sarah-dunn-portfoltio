import { link, linkBlock } from "@/fields/link";
import { ExpandedFeature } from "@/plugins/lexical-expanded";
import { FullscreenFeature } from "@/plugins/lexical-fullscreen";
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
  interfaceName: "ContentBlock",
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
              blocks: [linkBlock],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            LayoutsFeature(),
            FullscreenFeature(),
            ExpandedFeature(),
          ];
        },
      }),
    },
  ],
};
