import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";

import { MarqueeBlock } from "@/blocks/marquee-block/config";
import { ExpandedFeature } from "@/plugins/lexical-expanded";
import { FullscreenFeature } from "@/plugins/lexical-fullscreen";
import { LayoutsFeature } from "@/plugins/lexical-layouts";

import { linkBlock } from "./link";

export const defaultLexical = lexicalEditor({
  features: () => {
    return [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      ParagraphFeature(),
      HeadingFeature(),
      AlignFeature(),
      IndentFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      LinkFeature(),
      BlockquoteFeature(),
      UploadFeature(),
      HorizontalRuleFeature(),
      FixedToolbarFeature(),
      BlocksFeature({
        blocks: [linkBlock, MarqueeBlock],
      }),
      EXPERIMENTAL_TableFeature(),
      LayoutsFeature(),
      FullscreenFeature(),
      ExpandedFeature(),
    ];
  },
});
