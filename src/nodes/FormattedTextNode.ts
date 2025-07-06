import {
  TextNode,
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type NodeKey,
} from "lexical";
import type { StringObject } from "../types";

export class FormattedTextNode extends TextNode {
  __style: string;

  constructor(text: string, style: string, key?: NodeKey) {
    super(text, key);
    this.__style = style;
  }

  static getType(): string {
    return "formatted-text";
  }

  static clone(node: FormattedTextNode): FormattedTextNode {
    return new FormattedTextNode(node.__text, node.__style, node.__key);
  }

  createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement {
    const element = super.createDOM(config, editor);
    if (this.__style) {
      attachStyleToDOM(element, this.__style);
    }
    return element;
  }

  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    let isUpdateNeeded = super.updateDOM(prevNode, dom, config);
    if (prevNode.__style !== this.__style) {
      isUpdateNeeded = true;
    //   attachStyleToDOM(dom, this.__style);
    }
    return isUpdateNeeded;
  }

  setStyle(style: string) {
    const writable = this.getWritable();
    writable.__style = style;
    return writable;
  }

  getStyle(): string {
    return this.__style;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (dom) => {
        if (dom instanceof HTMLElement && dom.hasAttribute("style")) {
          const style = dom.getAttribute("style") || "";
          const text = dom.textContent || "";
          return {
            conversion: () => ({ node: $createFormattedText(text, style) }),
            priority: 0,
          };
        }
        return null;
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const span = document.createElement("span");
    if (this.__style) {
      attachStyleToDOM(span, this.__style);
    }
    span.textContent = this.__text;
    return { element: span };
  }
}

export function $parseStyleString(style: string): StringObject {
  if (typeof style !== "string") return {};

  const parsedStyle: StringObject = {};
  style.split(";").forEach((eachStyle) => {
    const [key, value] = eachStyle.split(":");
    if (key && value) {
      parsedStyle[key] = value;
    }
  });
  return parsedStyle;
}
export function $stringifyStyleObject(style: StringObject): string {
  if (typeof style !== "object") return "";

  return Object.entries(style)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

export function $createFormattedText(text: string, style: string) {
  return new FormattedTextNode(text, style);
}

export function $isFormattedText(node: unknown): node is FormattedTextNode {
  return node instanceof FormattedTextNode;
}

function attachStyleToDOM(element: HTMLElement, styleString: string): void {
  if (!styleString) return;
  const parsedStyle = $parseStyleString(styleString);
  for (const [key, value] of Object.entries(parsedStyle)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element.style[key as any] = value;
  }
}
