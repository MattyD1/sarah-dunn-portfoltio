import {
  convertLexicalNodesToHTML,
  createNode,
  createServerFeature,
} from "@payloadcms/richtext-lexical";
import { Config, Field, FieldSchemaMap, sanitizeFields } from "payload";
import { LayoutContainerNode } from "../client/nodes/layout-container-node";

const fields: Field[] = [
  {
    name: "columns",
    type: "select",
    required: true,
    defaultValue: "1fr 1fr",
    options: [
      { label: "2 columns (equal width)", value: "1fr 1fr" },
      { label: "2 columns (25% - 75%)", value: "1fr 3fr" },
      { label: "3 columns (equal width)", value: "1fr 1fr 1fr" },
      { label: "3 columns (25% - 50% - 25%)", value: "1fr 2fr 1fr" },
      { label: "4 columns (equal width)", value: "1fr 1fr 1fr 1fr" },
    ],
  },
];

export const LayoutsFeature = createServerFeature({
  feature: async ({ config, isRoot, parentIsLocalized }) => {
    const validRelationships = config.collections.map((c) => c.slug) || [];

    const sanitizedFields = await sanitizeFields({
      config: config as unknown as Config,
      fields,
      parentIsLocalized,
      requireFieldLevelRichTextEditor: isRoot,
      validRelationships,
    });

    return {
      ClientFeature: "/plugins/lexical-layouts/client#LayoutsFeatureClient",
      generateSchemaMap: () => {
        const schemaMap: FieldSchemaMap = new Map();

        schemaMap.set("fields", {
          fields: sanitizedFields,
        });

        return schemaMap;
      },
      nodes: [
        createNode({
          converters: {
            html: {
              converter: async ({
                converters,
                currentDepth,
                depth,
                draft,
                node,
                overrideAccess,
                parent,
                req,
                showHiddenFields,
              }) => {
                const childrenText = await convertLexicalNodesToHTML({
                  converters,
                  currentDepth,
                  depth,
                  draft,
                  lexicalNodes: node.children,
                  overrideAccess,
                  parent: {
                    ...node,
                    parent,
                  },
                  req,
                  showHiddenFields,
                });
                return `<div class="layoutContainer">${childrenText}</div>`;
              },
              nodeTypes: [LayoutContainerNode.getType()],
            },
          },
          node: LayoutContainerNode,
        }),
      ],
    };
  },
  key: "layouts",
});
