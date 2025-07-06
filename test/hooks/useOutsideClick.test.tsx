import React, { RefObject, useRef } from "react";
import { cleanup, render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from "vitest";
import useOutsideClick from "../../src/hooks/useOutsideClick";

const TestComponent = ({ onOutsideClick }: { onOutsideClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick<HTMLDivElement>(
    ref as RefObject<HTMLDivElement>,
    onOutsideClick
  );
  return (
    <>
      <div ref={ref} data-testid="inside"></div>
      <div data-testid="outside"></div>
    </>
  );
};

describe("useOutsideClick", () => {
  afterEach(() => {
    cleanup();
  });

  it("should call the callback when clicking outside", () => {
    const onOutsideClick = vi.fn();

    const { getByTestId }  = render(<TestComponent onOutsideClick={onOutsideClick} />)

    const outside = getByTestId(/outside/i);
    outside.dispatchEvent(new MouseEvent("mousedown", {bubbles: true }));

    expect(onOutsideClick).toHaveBeenCalledOnce();
  });
  it("should not call the callback when clicking inside", () => {
    const onOutsideClick = vi.fn();

    const { getByTestId }  = render(<TestComponent onOutsideClick={onOutsideClick} />)

    const inside = getByTestId(/inside/i);
    inside.dispatchEvent(new MouseEvent("mousedown", {bubbles: true }));

    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
