import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../../src/components/Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("render children  correctly", () => {
    render(<Button>Click Here</Button>);
    expect(screen.getByText(/click here/i)).toBeInTheDocument();
  });
  it("render children with default variant: secondary", () => {
    render(<Button>Click Here</Button>);
    const button = screen.getByRole("button", { name: /click here/i });
    expect(button).toHaveClass("bg-gray-300");
  });
  it("render button with primary variant style", () => {
    render(<Button variant="primary">Save</Button>);
    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toHaveClass("bg-blue-500");
  });
  it("render button with ghost variant style", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: /ghost/i });
    expect(button).toHaveClass("bg-transparent text-black hover:bg-gray-100");
  });
  it("render button merged default variant  with custom style", () => {
    render(<Button className="bg-red text-white">Close</Button>);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toHaveClass("bg-red text-white");
  });
  it("should call onClick when click", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Close</Button>);
    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });
  it("should not trigger onClick when disbaled", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        Close
      </Button>
    );

    const button = screen.getByRole("button", { name: /close/i });

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
  it('should accept aria attributes', () => {
      render(<Button aria-label="save">Save</Button>);
      expect(screen.getByLabelText(/save/i)).toBeInTheDocument();
  })
});
