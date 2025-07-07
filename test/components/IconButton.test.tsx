import React from 'react';
import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import IconButton from ".././../src/components/IconButton";
import { FaBold } from "react-icons/fa";
import "@testing-library/jest-dom";


describe("IconButton", () => {
  afterEach(() => cleanup());
  it("should render button label and style when active", () => {
    const { getByTestId, getByRole } = render(
      <IconButton label="Bold" active onClick={() => {}}>
        <FaBold data-testid="icon" />
      </IconButton>
    );

    const button = getByRole('option');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', "Bold");
    expect(button).toHaveAttribute('aria-selected', "true");

    const icon = getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render the button as disabled when the disabled prop is applied, and should not trigger the onClick handler", () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <IconButton label="Bold" disabled onClick={onClick}>
        <FaBold data-testid="icon" />
      </IconButton>
    );

    const button = getByRole('option');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled()
  });
  it("should render the button and trigger on click when the button is not disabled", () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <IconButton label="Bold" onClick={onClick}>
        <FaBold data-testid="icon" />
      </IconButton>
    );

    const button = getByRole('option');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce()
  });
});
