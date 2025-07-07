/*
Renders with correct default selection
Opens/closes on toggle
Renders all options
Selects an option and fires onSelect
Closes when clicked outside
*/

import React from "react";
import { it, describe, vi, afterEach, expect } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Dropdown, { DropdownOption } from "../../src/components/Dropdown";
import { FaBold, FaItalic } from "react-icons/fa";
import "@testing-library/jest-dom";

describe("Dropdown", () => {
  const options: DropdownOption[] = [
    { label: "Bold", value: "bold", icon: <FaBold data-testid="icon-bold" /> },
    {
      label: "Italic",
      value: "italic",
      icon: <FaItalic data-testid="icon-italic" />,
    },
  ];

  afterEach(() => { cleanup(); });

  it("should render with default selected value", () => {
    render(
      <Dropdown
        type="icon-only"
        orientation="horizontal"
        options={options}
        selectedValue="bold"
        onSelect={() => {}}
      />
    );
    expect(screen.getByLabelText("Bold")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-bold")).toBeInTheDocument();
  });
  it("should open/close on toggle", () => {
    const onSelect = vi.fn();
    render(
      <Dropdown
        type="value-only"
        orientation="vertical"
        options={options}
        selectedValue="italic"
        onSelect={onSelect}
      />
    );

    const toggleButton = screen.getByRole('option');

    // Open
    fireEvent.click(toggleButton);
    expect(screen.queryByRole('listbox')).toBeInTheDocument();

    // Close
    fireEvent.click(toggleButton);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  });
  it("should renders all options", () => {
    const onSelect = vi.fn();
    render(
      <Dropdown
        type="value-only"
        orientation="vertical"
        options={options}
        selectedValue="italic"
        onSelect={onSelect}
      />
    );

    const toggleButton = screen.getByRole('option');
    fireEvent.click(toggleButton);

    const listbox = screen.queryByRole('listbox');
    expect(listbox).toBeInTheDocument();
    options.forEach((eachOption) => {
       expect(screen.queryByText(eachOption.label)).toBeInTheDocument();
    })
  });
  it("should calls onSelect when an option is selected", () => {
    const onSelect = vi.fn();
    render(
      <Dropdown
        type="value-only"
        orientation="vertical"
        options={options}
        selectedValue="italic"
        onSelect={onSelect}
      />
    );
    const toggleButton = screen.getByRole('option');
    fireEvent.click(toggleButton);

    const italicOption = screen.getByText('Italic');
    fireEvent.click(italicOption);

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith('italic');
  });
  it("should closes when clicked outside", () => {
    render(
        <div>
            <Dropdown
                type="value-only"
                orientation="vertical"
                options={options}
                selectedValue="italic"
                onSelect={vi.fn()}
            />
            <div data-testid="outside"></div>
        </div>
    )
    // Open
    const toggleButton = screen.getByRole('option');
    fireEvent.click(toggleButton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
});
