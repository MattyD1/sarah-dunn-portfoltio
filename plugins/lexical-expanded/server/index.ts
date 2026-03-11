import {
  createServerFeature,
  StronglyTypedElementNode,
} from "@payloadcms/richtext-lexical";
import type { ExpandedContainerNode as _SerializedExpandedContainerNode } from "../client/nodes/expanded-container-node";
import { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";

export type SerializedExpandedContainerNode<
  T extends SerializedLexicalNode = SerializedLexicalNode,
> = StronglyTypedElementNode<
  _SerializedExpandedContainerNode,
  "expandedcontainer",
  T
>;

export const ExpandedFeature = createServerFeature({
  feature: {
    ClientFeature: "/plugins/lexical-expanded/client#ExpandedFeatureClient",
  },
  key: "expanded",
});
