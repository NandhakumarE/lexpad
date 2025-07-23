import { DecoratorNode, type DOMConversionMap } from "lexical";
import PageBreakComponent from "./PageBreakComponent";
import type { JSX } from "react";

export class PageBreakNode extends DecoratorNode<JSX.Element> {
  constructor(key?: string) {
    super(key);
  }
  static getType() {
    return "page-break";
  }

  static clone(node: PageBreakNode): PageBreakNode {
    return new PageBreakNode(node.__key);
  }

  createDOM() {
    const element = document.createElement("div");
    element.className = "page-break";
    return element;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return <PageBreakComponent />;
  }

  static importDOM(): DOMConversionMap {
    return {
      div: () => {
        return {
          conversion: () => ({ node: new PageBreakNode() }),
          priority: 0,
        };
      },
    };
  }

  static importJSON(): PageBreakNode {
    return new PageBreakNode();
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "page-break",
      version: 1,
    };
  }
}

export function $createPageBreakNode(): PageBreakNode {
  return new PageBreakNode();
}

export function $isPageBreakNode(
  node: unknown
): node is PageBreakNode {
  return node instanceof PageBreakNode;
}