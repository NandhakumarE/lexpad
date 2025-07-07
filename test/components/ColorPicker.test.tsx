/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { it, describe, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPicker from "../../src/components/ColorPicker";
import { CgFormatColor } from "react-icons/cg";

vi.mock("react-color", async (module) => {
  const originalModules = await module();
  return {
    ...(originalModules as any),
    SketchPicker: ({
      color,
      onChange,
    }: {
      color: string;
      onChange: (event: any) => void;
    }) => (
      <div data-testid="sketch-picker">
        <input
          data-testid="color-input"
          type="color"
          value={color}
          onChange={(e) => {
            onChange({ hex: e.target.value });
          }}
        />
      </div>
    ),
  };
});

describe("ColorPicker", () => {
  afterEach(() => cleanup());
  it("should render base icon ", () => {
    render(
      <ColorPicker
        label="Format Text Color"
        color="#fff"
        baseIcon={<CgFormatColor data-testid="format-color" />}
        onChange={() => {}}
      />
    );
    expect(screen.getByTestId("format-color")).toBeInTheDocument();
  });
  it("should toggle the color picker when the button is clicked", () => {
    render(
      <ColorPicker
        label="Format Text Color"
        color="#fff"
        baseIcon={<CgFormatColor data-testid="format-color" />}
        onChange={() => {}}
      />
    );

    const toggleBtn = screen.getByRole("option");
    expect(screen.queryByTestId("sketch-picker")).not.toBeInTheDocument();
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("sketch-picker")).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByTestId("sketch-picker")).not.toBeInTheDocument();
  });
  it("should call onChange when a new color is selected", () => {
    const onChange = vi.fn();
    render(
      <ColorPicker
        label="Format Text Color"
        color="#ffffff"
        baseIcon={<CgFormatColor data-testid="format-color" />}
        onChange={onChange}
      />
    );

    const button = screen.getByRole("option");
    fireEvent.click(button);

    const colorInput = screen.getByTestId("color-input");
    expect(colorInput).toBeInTheDocument();

    fireEvent.change(colorInput, { target: { value: "#333333" } });
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith({ hex: "#333333" });
  });
  it("should closes when clicked outside", () => {
    render(
      <div>
        <ColorPicker
          label="Format Text Color"
          color="#ffffff"
          baseIcon={<CgFormatColor data-testid="format-color" />}
          onChange={() => {}}
        />
        <div data-testid="outside"></div>
      </div>
    );
    // Open
    const toggleButton = screen.getByRole("option");
    fireEvent.click(toggleButton);

    expect(screen.getByTestId("sketch-picker")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByRole("sketch-picker")).not.toBeInTheDocument();
  });
});
