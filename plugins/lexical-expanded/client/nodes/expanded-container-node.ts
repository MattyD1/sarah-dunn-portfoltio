/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  LexicalUpdateJSON,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "@payloadcms/richtext-lexical/lexical";
import {
  $isParagraphNode,
  ElementNode,
} from "@payloadcms/richtext-lexical/lexical";
import { addClassNamesToElement } from "@payloadcms/richtext-lexical/lexical/utils";

export type SerializedExpandedContainerNode = Spread<
  {
    templateColumns: string;
  },
  SerializedElementNode
>;

function $convertExpandedContainerElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const styleAttributes = window.getComputedStyle(domNode);
  const templateColumns = styleAttributes.getPropertyValue(
    "grid-template-columns"
  );
  if (templateColumns) {
    const node = $createExpandedContainerNode();
    return { node };
  }
  return null;
}

export function $isEmptyExpandedContainerNode(node: LexicalNode): boolean {
  if (!$isExpandedContainerNode(node)) {
    return false;
  }

  const firstChild = node.getFirstChild();
  return $isParagraphNode(firstChild) && firstChild.isEmpty();
}

export class ExpandedContainerNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return "expandedContainer";
  }

  static clone(node: ExpandedContainerNode): ExpandedContainerNode {
    return new ExpandedContainerNode(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("div");
    addClassNamesToElement(dom, "LexicalEditorTheme__expandedContainer");

    return dom;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute("data-lexical-layout-container", "true");
    return { element };
  }

  updateDOM(): boolean {
    return false;
  }

  collapseAtStart(): boolean {
    if ($isEmptyExpandedContainerNode(this)) {
      this.remove();
      return true;
    }

    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-layout-container")) {
          return null;
        }
        return {
          conversion: $convertExpandedContainerElement,
          priority: 2,
        };
      },
    };
  }

  static importJSON(
    json: SerializedExpandedContainerNode
  ): ExpandedContainerNode {
    return $createExpandedContainerNode().updateFromJSON(json);
  }

  updateFromJSON(
    serializedNode: LexicalUpdateJSON<SerializedExpandedContainerNode>
  ): this {
    return super.updateFromJSON(serializedNode);
  }

  isShadowRoot(): boolean {
    return true;
  }

  canBeEmpty(): boolean {
    return false;
  }
}

export function $createExpandedContainerNode(): ExpandedContainerNode {
  return new ExpandedContainerNode();
}

export function $isExpandedContainerNode(
  node: LexicalNode | null | undefined
): node is ExpandedContainerNode {
  return node instanceof ExpandedContainerNode;
}
