"use client";

import {
  createClientFeature,
  toolbarAddDropdownGroupWithItems,
} from "@payloadcms/richtext-lexical/client";
import { LayoutItemNode } from "./nodes/layout-item-node";
import { LayoutContainerNode } from "./nodes/layout-container-node";
import {
  ColumnsPlugin,
  OPEN_LAYOUTS_DRAWER_COMMAND,
} from "./plugins/columns-plugin";
import { ColumnsIcon } from "../ui/icons/columns";

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
