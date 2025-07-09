import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import "@testing-library/jest-dom";

import * as formattedTextHelper from "../../src/hooks/useFormattedTextHelper";
import BoldPlugin from "../../src/plugins/BoldPlugin";

// Mock the useFormattedTextHelper module
vi.mock("../../src/hooks/useFormattedTextHelper", () => ({
  default: vi.fn(),
}));

describe("BoldPlugin", () => {
  const updateStyle = vi.fn();

  beforeEach(() => {
    vi.spyOn(formattedTextHelper, "default").mockImplementation((props) => ({
      updateStyle,
      ...props, // Preserve original callbacks like retrieveTrackedDataCallBack
    }));

    render(<BoldPlugin />);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the bold icon and button", () => {
    const toggleButton = screen.getByRole("option");
    const boldIcon = screen.getByTestId("bold-icon");

    expect(toggleButton).toBeInTheDocument();
    expect(boldIcon).toBeInTheDocument();
  });

  it("should toggle on/off bold style correctly", () => {
    const toggleButton = screen.getByRole("option");

    // Simulate first click to apply bold
    fireEvent.click(toggleButton);
    expect(updateStyle).toHaveBeenCalledWith({ fontWeight: "bold" });

    // Simulate the helper hook updating with bold selection
    act(() => {
      const callArgs = vi.mocked(formattedTextHelper.default).mock.calls[0][0];
      callArgs.retrieveTrackedDataCallBack(["bold"]);
    });

    expect(toggleButton).toHaveAttribute("aria-selected", "true");

    // Simulate second click to remove bold
    fireEvent.click(toggleButton);
    expect(updateStyle).toHaveBeenCalledWith({ fontWeight: "default" });
  });
});
