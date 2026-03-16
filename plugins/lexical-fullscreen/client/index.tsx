"use client";

import type {
  ToolbarGroup,
  ToolbarGroupItem,
} from "@payloadcms/richtext-lexical";
import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { FullscreenIcon } from "@/plugins/ui/icons/fullscreen";

import { FullscreenPlugin } from "./plugins/fullscreen-plugin";
import { toggleFullscreen } from "./plugins/fullscreen-plugin/toggle-fullscreen";

const FullscreenButton = (props: { editor: LexicalEditor }) => {
  const { editor } = props;

  return (
    <button
      type="button"
      className={`toolbar-popup__button toolbar-popup__button-toggleFullscreen`}
      onClick={() => toggleFullscreen({ editor })}
    >
      <FullscreenIcon />
    </button>
  );
};

const toolbarFullscreenGroupWithItems = (
  items: ToolbarGroupItem[]
): ToolbarGroup => {
  return {
    type: "buttons",
    items,
    key: "fullscreenEditor",
    order: 9999,
  };
};

export const FullscreenFeatureClient = createClientFeature({
  plugins: [
    {
      Component: FullscreenPlugin,
      position: "normal",
    },
  ],
  toolbarFixed: {
    groups: [
      toolbarFullscreenGroupWithItems([
        {
          Component: FullscreenButton,
          key: "toggleFullscreen",
          order: 1,
        },
      ]),
    ],
  },
});
