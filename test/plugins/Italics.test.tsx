import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  act,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import * as formattedTextHelper from "../../src/hooks/useFormattedTextHelper";
import ItalicsPlugin from "../../src/plugins/ItalicsPlugin";

vi.mock("../../src/hooks/useFormattedTextHelper", () => ({
  default: vi.fn(),
}));

describe("Italics", () => {
  const updateStyle = vi.fn();

  beforeEach(() => {
    vi.spyOn(formattedTextHelper, "default").mockImplementation((props) => {
      return {
        updateStyle,
        ...props,
      };
    });
    render(<ItalicsPlugin />);
  });
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the italic icon and button", () => {
    expect(screen.getByLabelText("italic")).toBeInTheDocument();
    expect(screen.getByTestId("italic-icon")).toBeInTheDocument();
  });
  it("should toggle on/off italic style correctly", () => {
    const toggleBtn = screen.getByLabelText("italic");

    // Simulate first click to apply italic
    fireEvent.click(toggleBtn);
    expect(updateStyle).toHaveBeenCalledWith({ fontStyle: "italic" });

    // Simulate the helper hook updating with italic selection
    act(() => {
      vi.mocked(
        formattedTextHelper.default
      ).mock.calls[0][0].retrieveTrackedDataCallBack(["italic"]);
    });

    const updatedBtn = screen.getByLabelText("italic");
    expect(updatedBtn).toHaveAttribute("aria-selected", "true");

    // Simulate second click to remove italic
    fireEvent.click(toggleBtn);
    expect(updateStyle).toHaveBeenCalledWith({ fontStyle: "default" });
  });
});
