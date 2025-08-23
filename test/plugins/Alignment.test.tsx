/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { $getSelection, FORMAT_ELEMENT_COMMAND, type LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { it, describe, vi, beforeEach, expect } from "vitest";
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Alignment from '../../src/plugins/Alignment';

/*
  mock: 
   useLexicalComposerContext

*/

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: vi.fn(),
}));

vi.mock("lexical", async (originalModule) => {
  const module = await originalModule();
  return {
    ...(module as any),
    $getSelection: vi.fn(),
    $isRangeSelection: vi.fn(),
  };
});

vi.mock("../../src/components/Dropdown", () => ({
  default: ({
    options,
    selectedValue,
    onSelect,
  }: {
    options: any[];
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => {
    return (
      <div data-testid="alignment">
        <div data-testid="selected-value">{selectedValue}</div>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            data-testid={`option-${option.value}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  },
}));

describe("Alignment", () => {
  const mockRead = vi.fn((cb) => cb());
  const mockDispatchCommand = vi.fn();
  let editor: LexicalEditor;
  const mockNode = { getParent: vi.fn(() => ({ getFormatType: () => "left" })) };

  beforeEach(() => {
    editor = {
      registerUpdateListener: vi.fn((cb) => {
        cb({ editorState: { read: mockRead } });
        return () => {};
      }),
      dispatchCommand: mockDispatchCommand,
    } as unknown as LexicalEditor;

    const mockSelection = { getNodes: () => [mockNode] } as unknown as ReturnType<typeof $getSelection>;

    vi.mocked(useLexicalComposerContext).mockReturnValue([
      editor,
      { getTheme: () => null },
    ]);
    vi.mocked($getSelection).mockReturnValue(mockSelection);
  });

  it("should render dropdown with first option as selected value", () => {
    render(<Alignment/>);
    const alignmentDropdown = screen.getByTestId('alignment');
    expect(alignmentDropdown).toBeInTheDocument();
    expect(screen.getByTestId("selected-value").textContent).toMatch(/left/);
  });

  it("should dispatch right alignment when Right option is clicked", () => {
  render(<Alignment />);
  const alignRightBtn = screen.getByTestId("option-right");
  fireEvent.click(alignRightBtn);
  expect(mockDispatchCommand).toHaveBeenCalledWith(FORMAT_ELEMENT_COMMAND, "right");
});

it("should dispatch center alignment when Center option is clicked", () => {
  render(<Alignment />);
  const alignCenterBtn = screen.getByTestId("option-center");
  fireEvent.click(alignCenterBtn);
  expect(mockDispatchCommand).toHaveBeenCalledWith(FORMAT_ELEMENT_COMMAND, "center");
});

it("should dispatch justify alignment when Justify option is clicked", () => {
  render(<Alignment />);
  const alignJustifyBtn = screen.getByTestId("option-justify");
  fireEvent.click(alignJustifyBtn);
  expect(mockDispatchCommand).toHaveBeenCalledWith(FORMAT_ELEMENT_COMMAND, "justify");
});
});
