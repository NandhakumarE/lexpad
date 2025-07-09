import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FontColor from "../../src/plugins/FontColor";
import type { ColorPickerProps } from "../../src/types";
import * as formattedTextHelper from "../../src/hooks/useFormattedTextHelper";

// mocking color picker and  useFormattedTextHelper
vi.mock("../../src/components/ColorPicker", () => {
  return {
    default: ({ label, baseIcon, color, onChange }: ColorPickerProps) => {
      return (
        <div>
          {baseIcon}
          <input
            aria-label={label}
            type="color"
            value={color}
            onChange={(event) =>
              onChange({
                hex: event.target.value,
                hsl: { h: 0, s: 0, l: 0 },
                rgb: { r: 0, g: 0, b: 0 },
              })
            }
          />
        </div>
      );
    },
  };
});
vi.mock("../../src/hooks/useFormattedTextHelper", () => ({
  default: vi.fn(),
}));

describe("FontColor", () => {
  const updateStyle = vi.fn();
  beforeEach(() => {
    vi.spyOn(formattedTextHelper, "default").mockImplementation(() => {
      return {
        updateStyle,
      };
    });
    render(<FontColor />);
  });
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("should render the font color button with the icon", () => {
    expect(screen.queryByLabelText("Font color")).toBeInTheDocument();
    expect(screen.getByTestId("format-color-icon")).toBeInTheDocument();
  });

  it("should update font color and reflect the change in the icon", () => {
    const input = screen.queryByLabelText("Font color");

    fireEvent.change(input as HTMLElement, {target:{value:"#333333"}});
    expect(updateStyle).toHaveBeenCalledWith({color: "#333333"});

    act(() => {
       vi.mocked(formattedTextHelper.default).mock.calls[0][0].retrieveTrackedDataCallBack(["#333333"])
    })

    const icon = screen.getByTestId('format-color-icon');
    expect(icon).toHaveAttribute('color', "#333333");
  });
});
