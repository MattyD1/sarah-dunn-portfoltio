import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  IndentFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
} from "@payloadcms/richtext-lexical";
import { Field } from "payload";

import { linkGroup } from "@/fields/link-group";
import { ExpandedFeature } from "@/plugins/lexical-expanded";
import { FullscreenFeature } from "@/plugins/lexical-fullscreen";
import { LayoutsFeature } from "@/plugins/lexical-layouts";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      label: "Type",
      required: true,
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
      ],
    },
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: () => {
          return [
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            ParagraphFeature(),
            AlignFeature(),
            IndentFeature(),
            FixedToolbarFeature(),
            LayoutsFeature(),
            FullscreenFeature(),
            ExpandedFeature(),
          ];
        },
      }),
      label: "Heading",
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      label: "Featured Work",
      relationTo: "media",
      required: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
    },
  ],
  label: false,
};
