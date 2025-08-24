/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, type LexicalEditor } from "lexical";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { $createFormattedText, $isFormattedText } from "../../src/nodes/FormattedTextNode";
import useFormattedTextHelper from "../../src/hooks/useFormattedTextHelper";

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: vi.fn(),
}));

vi.mock("lexical", async (originalModule) => {
  const original = await originalModule();
  return {
    ...(original as any),
    $getSelection: vi.fn(),
    $isRangeSelection: vi.fn(),
  };
});

vi.mock("../../src/nodes/FormattedTextNode", async (originalModule) => {
  const original = await originalModule();

  return {
    ...(original as any),
    $createFormattedText: vi.fn(),
    $isFormattedText: vi.fn(),
  };
});

describe("useFormattedTextHelper", () => {
  let mockRead: (cb: () => void) => void;
  let mockUpdate: (cb: () => void) => void;
  let editor: LexicalEditor;
  const mockNodes = {
    getStyle: () => "font-weight:bold;",
    getTextContent: () => "hello",
    setStyle: vi.fn(),
    replace: vi.fn(),
  };
  beforeEach(() => {
    // Mocking as like lexical editor
    mockRead = vi.fn((cb) => cb());
    mockUpdate = vi.fn((cb) => cb());

    editor = {
      registerUpdateListener: vi.fn((cb) => {
        cb({ editorState: { read: mockRead } });
        return () => {};
      }),
      update: mockUpdate,
    } as unknown as LexicalEditor;

    const mockSelection = {
      extract: () => [mockNodes],
      getNodes: () => [mockNodes],
    } as unknown as ReturnType<typeof $getSelection>;

    vi.mocked(useLexicalComposerContext).mockReturnValue([
      editor,
      { getTheme: () => null },
    ]);
    vi.mocked($getSelection).mockReturnValue(mockSelection);
  });
  it("registers update listener and tracks style changes", () => {
    vi.mocked($isRangeSelection).mockReturnValue(true);
    vi.mocked($isFormattedText).mockReturnValue(true);

    const retrieveTrackedDataCallBack = vi.fn();
    const getTrackingMetric = vi.fn(() => "bold");

    // Rendering hook and excuting tests.
    renderHook(() =>
      useFormattedTextHelper({
        retrieveTrackedDataCallBack,
        getTrackingMetric,
      })
    );

    expect(editor.registerUpdateListener).toHaveBeenCalled();
    expect(mockRead).toHaveBeenCalled();
    expect(retrieveTrackedDataCallBack).toBeCalledWith(["bold"]);
  });
  it("should updated style properly", () => {
    vi.mocked($isRangeSelection).mockReturnValue(true);
    vi.mocked($isFormattedText).mockReturnValue(true);

    const { result } = renderHook(() =>
      useFormattedTextHelper({
        retrieveTrackedDataCallBack: vi.fn(),
        getTrackingMetric: vi.fn(),
      })
    );
    result.current.updateStyle({ color: "steelblue" });
    expect(mockNodes.setStyle).toHaveBeenCalledWith(
      "font-weight:bold;color:steelblue"
    );
  });
  it("should update the style even the extracted node is not Formatted Text Node", () => {

    vi.mocked($isRangeSelection).mockReturnValue(true);
    vi.mocked($isFormattedText).mockReturnValue(false);

    const fakeFormattedNode = { type: "FormattedTextNode", style: "color:steelblue" };

    vi.mocked($createFormattedText).mockReturnValue(fakeFormattedNode as any)


    const retrieveTrackedDataCallBack = vi.fn();
    const getTrackingMetric = vi.fn();

    const { result } = renderHook(() => useFormattedTextHelper({
       retrieveTrackedDataCallBack,
       getTrackingMetric,
    }));

    result.current.updateStyle(({ color: "steelblue" }))
    expect(retrieveTrackedDataCallBack).toHaveBeenCalledWith(['default']);
  })
});
