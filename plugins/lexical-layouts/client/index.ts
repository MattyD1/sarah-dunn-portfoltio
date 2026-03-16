"use client";

import {
  createClientFeature,
  toolbarAddDropdownGroupWithItems,
} from "@payloadcms/richtext-lexical/client";

import { ColumnsIcon } from "../../ui/icons/columns";
import { LayoutContainerNode } from "./nodes/layout-container-node";
import { LayoutItemNode } from "./nodes/layout-item-node";
import {
  ColumnsPlugin,
  OPEN_LAYOUTS_DRAWER_COMMAND,
} from "./plugins/columns-plugin";

export const LayoutsFeatureClient = createClientFeature({
  nodes: [LayoutItemNode, LayoutContainerNode],
  plugins: [
    {
      Component: ColumnsPlugin,
      position: "normal",
    },
  ],
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: ColumnsIcon,
          key: "columns",
          label: "Columns Layout",
          onSelect: ({ editor }) => {
            editor.dispatchCommand(OPEN_LAYOUTS_DRAWER_COMMAND, {});
          },
        },
      ]),
    ],
  },
});
