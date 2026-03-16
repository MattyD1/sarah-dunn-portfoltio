import { JSXConverters } from "@payloadcms/richtext-lexical/react";

import { SerializedExpandedContainerNode } from "../lexical-expanded/server";

export const ExpandedJSXConverter: JSXConverters<SerializedExpandedContainerNode> =
  {
    expandedContainer: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({
        nodes: node.children,
      });
      return <div className="-mx-26">{children}</div>;
    },
  };
