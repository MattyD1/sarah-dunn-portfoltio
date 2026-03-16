import { JSXConverters } from "@payloadcms/richtext-lexical/react";

import {
  SerializedLayoutContainerNode,
  SerializedLayoutItemNode,
} from "../lexical-layouts/server";

export const LayoutsJSXConverter: JSXConverters<
  SerializedLayoutContainerNode | SerializedLayoutItemNode
> = {
  layoutContainer: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    });
    return (
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `${node.templateColumns}`,
        }}
      >
        {children}
      </div>
    );
  },
  layoutItem: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    });
    return <div>{children}</div>;
  },
};
