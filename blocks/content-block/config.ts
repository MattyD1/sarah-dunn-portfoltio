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
import { MarqueeBlock } from "../marquee-block/config";
import { MediaBlock } from "../media-block/config";
import { blockOptions } from "@/fields/block-options";

export const ContentBlock: Block = {
  slug: "contentBlock",
  interfaceName: "ContentBlock",
  fields: [
    blockOptions(),
    {
      name: "richText",
      type: "richText",
      label: "false",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            BlocksFeature({
              blocks: [linkBlock, MarqueeBlock, MediaBlock],
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
