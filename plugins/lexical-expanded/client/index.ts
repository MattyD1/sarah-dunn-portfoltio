"use client";

import {
  createClientFeature,
  toolbarAddDropdownGroupWithItems,
} from "@payloadcms/richtext-lexical/client";
import { ExpandedContainerNode } from "./nodes/expanded-container-node";
import { INSERT_EXPANDED_COMMAND, LayoutPlugin } from "./plugins/layout-plugin";
import { ExpandIcon } from "@/plugins/ui/icons/expanded";

export const ExpandedFeatureClient = createClientFeature({
  nodes: [ExpandedContainerNode],
  plugins: [
    {
      Component: LayoutPlugin,
      position: "normal",
    },
  ],
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: ExpandIcon,
          key: "expanded",
          label: "Expand",
          onSelect: ({ editor }) => {
            editor.dispatchCommand(INSERT_EXPANDED_COMMAND, "expanded");
          },
        },
      ]),
    ],
  },
});
