import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Toolbar from "../../src/toolbar/Toolbar";

const initialConfig = {
  namespace: "test-editor",
  theme: {},
  onError: (e: Error) => console.error(e),
};

describe("Toolbar", () => {
  it("should render all plugins and separators", () => {
    render(
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
      </LexicalComposer>
    );

    expect(screen.getByTestId("bold-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("italic-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("underline")).toBeInTheDocument();
    expect(screen.getByTestId("line-through")).toBeInTheDocument();
    expect(screen.getByTestId("font-size-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("font-color-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("background-color-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("alignment-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("line-height-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("ordered-list")).toBeInTheDocument();
    expect(screen.getByTestId("unordered-list")).toBeInTheDocument();
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByTestId("link-plugin")).toBeInTheDocument();
    expect(screen.getByTestId("horizontal-line")).toBeInTheDocument();
    expect(screen.getByTestId("page-break")).toBeInTheDocument();
  });
});

