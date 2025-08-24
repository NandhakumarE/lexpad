/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import {
  $createFormattedText,
  $isFormattedText,
  $parseStyleString,
  $stringifyStyleObject,
  FormattedTextNode,
} from "../../src/nodes/FormattedTextNode";
import { EditorConfig } from "lexical";

vi.mock("lexical", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as any),
    TextNode: class MockeTextNode {
      __text: string;
      __key: string;
      constructor(text: string, key?: string) {
        this.__text = text;
        this.__key = key ?? "key";
      }
      getTextContent() {
        return this.__text;
      }

      getWritable() {
        return this;
      }
      createDOM() {
        const dom = document.createElement("span");
        dom.textContent = this.__text;
        return dom;
      }
      updateDOM() {
        return false;
      }
    },
  };
});

describe("FormattedTextNode", () => {
  const SAMPLE_TEXT = "Nandha";
  const SAMPLE_STYLE = "font-weight:bold";
  it("should returns 'formatted-text' when getType is called on the class", () => {
    expect(FormattedTextNode.getType()).toBe("formatted-text");
  });
  it("should return styles correctly", () => {
    const node = $createFormattedText(SAMPLE_TEXT, SAMPLE_STYLE);
    expect(node.getStyle()).toBe(SAMPLE_STYLE);
  });
  it("should update the style via setStyle", () => {
    const node = $createFormattedText(SAMPLE_TEXT, SAMPLE_STYLE);
    node.setStyle("color: steelblue");
    expect(node.getStyle()).toBe("color: steelblue");
  });
  it("should clone properly, on calling clone method", () => {
    const originalNode = $createFormattedText(SAMPLE_TEXT, SAMPLE_STYLE);
    const clonedNode = FormattedTextNode.clone(originalNode);
    expect(clonedNode.getTextContent()).toBe(SAMPLE_TEXT);
    expect(clonedNode.getStyle()).toBe(SAMPLE_STYLE);
  });
  it("should create dom with attached style", () => {
    const node = $createFormattedText(SAMPLE_TEXT, SAMPLE_STYLE);
    const dom = node.createDOM({ theme: {} } as EditorConfig);
    expect(dom.style.fontWeight).toBe("bold");
    expect(dom.textContent).toBe(SAMPLE_TEXT);
  });
  it("should return true if style is different in updateDOM", () => {
    const prevNode = $createFormattedText(SAMPLE_TEXT, "color: red");
    const newNode = $createFormattedText(SAMPLE_TEXT, "color: blue");

    const dom = document.createElement("span");

    const fakeEditorConfig = { theme: {} } as EditorConfig;

    let isUpdated = newNode.updateDOM(prevNode, dom, fakeEditorConfig);
    expect(isUpdated).toBe(true);

    isUpdated = newNode.updateDOM(newNode, dom, fakeEditorConfig);
    expect(isUpdated).toBe(false);
  });
  it("should export dom correctly", () => {
    const node = $createFormattedText(SAMPLE_TEXT, SAMPLE_STYLE);
    const { element } = node.exportDOM() as { element: HTMLElement };
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toMatch(/span/i);
    expect(element.style.fontWeight).toMatch(/bold/i);
    expect(element.textContent).toBe(SAMPLE_TEXT);
  });
  it("should return the node is an instance of FormattedTextNode", () => {
    const node = $createFormattedText(SAMPLE_TEXT, SAMPLE_STYLE);
    expect($isFormattedText(node)).toBe(true);
    expect($isFormattedText({})).toBe(false);
  });
  it("should import dom correctly", () => {
     const spanDom = document.createElement('span');
     // without style and text
     let importSpan = FormattedTextNode.importDOM()?.['span']; 
     expect(importSpan).toBeDefined();

     expect(importSpan?.(spanDom)).toBeNull();

     // with style and text
     spanDom.setAttribute("style", SAMPLE_STYLE);
     spanDom.textContent = SAMPLE_TEXT;

     importSpan = FormattedTextNode.importDOM()?.['span']; 
     expect(importSpan).toBeDefined();

     const result = importSpan?.(spanDom);

     expect(result).not.toBeNull();
     expect(result?.priority).toBe(0);

     const conversionResult = result?.conversion(spanDom);
     expect(conversionResult).toHaveProperty("node")
  })
});

describe("Utils(FormattedText)", () => {
  it("should parse style string to object", () => {
    const parsedStyle = $parseStyleString("font-weight:bold;color:green");
    expect(parsedStyle).toEqual({ "font-weight": "bold", color: "green" });
  });
  it("should parse style object to string", () => {
    const parsedStyle = $stringifyStyleObject({
      "font-weight": "bold",
      color: "green",
    });
    expect(parsedStyle).toBe("font-weight:bold;color:green");
  });
  it("should handle invalid style gracefully", () => {
    expect($parseStyleString("")).toEqual({});
    expect($stringifyStyleObject({})).toEqual("");
  });
});
