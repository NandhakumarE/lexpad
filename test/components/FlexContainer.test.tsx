import React from "react";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FlexContainer from "../../src/components/FlexContainer";

describe("FlexContainer", () => {
  it("should render properly", () => {
    render(
      <FlexContainer>
        <div data-testid="child-1">hello</div>
      </FlexContainer>
    );

    const parent = screen.getByTestId('child-1').parentElement;
    expect(parent).toHaveClass('flex');
    expect(parent).toHaveClass('items-center');
    expect(parent).toHaveClass('gap-1');
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
  });
});
