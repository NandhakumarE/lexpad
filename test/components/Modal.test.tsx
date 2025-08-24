import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../src/components/Modal";

/*
  modal rendering with header, main and footer.
  variant check -> default(medium), small, large.
  click to trigger close
*/

describe("Modal", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-container");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal-container");
    if (modalRoot) document.body.removeChild(modalRoot);
  });

  it("should render modal with header, main and footer content correctly", () => {
    render(
      <Modal
        header="My Header"
        footer={<button>Save</button>}
        onClose={vi.fn}
      >
        Modal Content
      </Modal>
    );
    expect(screen.getByTestId("modal-header")).toHaveTextContent("My Header");
    expect(screen.getByTestId("modal-content")).toHaveTextContent(
      "Modal Content"
    );
    expect(screen.getByTestId("modal-footer")).toHaveTextContent("Save");
  });
  it("should render modal with small size variant correctly", () => {
    render(
      <Modal
        header="My Header"
        footer={<button>Save</button>}
        modalSize="small"
        onClose={vi.fn}
      >
        Modal Content
      </Modal>
    );
    expect(screen.getByTestId("modal-base-container")).toHaveClass(
      "max-w-[80%] sm:max-w-[50%] md:max-w-[40%]"
    );
  });
  it("should render modal with medium size variant correctly", () => {
    render(
      <Modal
        header="My Header"
        footer={<button>Save</button>}
        modalSize="medium"
        onClose={vi.fn}
      >
        Modal Content
      </Modal>
    );
    expect(screen.getByTestId("modal-base-container")).toHaveClass(
      "max-w-[90%] sm:max-w-[75%] md:max-w-[50%]"
    );
  });
  it("should render modal with small size variant correctly", () => {
    render(
      <Modal
        header="My Header"
        footer={<button>Save</button>}
        modalSize="large"
        onClose={vi.fn}
      >
        Modal Content
      </Modal>
    );
    expect(screen.getByTestId("modal-base-container")).toHaveClass(
      "max-w-[95%] sm:max-w-[85%] md:max-w-[80%]"
    );
  });
  it("should call onClose on clicking close button on header", () => {
    const onClose = vi.fn();

    render(
      <Modal
        header="My Header"
        footer={<button>Save</button>}
        modalSize="large"
        onClose={onClose}
      >
        Modal Content
      </Modal>
    );
    fireEvent.click(screen.getByTestId("modal-close-btn"));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
