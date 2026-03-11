import {
  createServerFeature,
  StronglyTypedElementNode,
} from "@payloadcms/richtext-lexical";
import { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import { Config, Field, FieldSchemaMap, sanitizeFields } from "payload";
import type { LayoutContainerNode as _SerializedLayoutContainerNode } from "../client/nodes/layout-container-node";
import type { LayoutItemNode as _SerializedLayoutItemNode } from "../client/nodes/layout-item-node";

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

export type SerializedLayoutContainerNode<
  T extends SerializedLexicalNode = SerializedLexicalNode,
> = StronglyTypedElementNode<
  _SerializedLayoutContainerNode,
  "layoutcontainer",
  T
>;

export type SerializedLayoutItemNode<
  T extends SerializedLexicalNode = SerializedLexicalNode,
> = StronglyTypedElementNode<_SerializedLayoutItemNode, "layoutitem", T>;

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
    };
  },
  key: "layouts",
});
