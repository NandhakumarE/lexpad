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
import TextDecoration from "../../src/plugins/TextDecoration";

vi.mock( "../../src/hooks/useFormattedTextHelper", () => ({
    default: vi.fn()
}))

describe('TextDecoration', () => {
    const updateStyle = vi.fn();
    beforeEach(() => {
       vi.spyOn(formattedTextHelper, 'default').mockImplementation((props) => {
          return {
            updateStyle,
            ...props
          }
       })
       render(<TextDecoration />)
    })
    afterEach(() => {
      cleanup();
      vi.clearAllMocks();
    })
    it("should render underline icon and button properly", () => {
       expect(screen.getByLabelText('Underline')).toBeInTheDocument();
       expect(screen.getByTestId('underline-icon')).toBeInTheDocument();
    })
    it("should render strike through icon and button properly", () => {
       expect(screen.getByLabelText('Strikethrough')).toBeInTheDocument();
       expect(screen.getByTestId('strike-through-icon')).toBeInTheDocument();
    })
    it("should toggle underline and strike-through styles correctly and update button states", () => {
        // Get the buttons
        let underlineButton = screen.getByLabelText('Underline');
        let strikeButton = screen.getByLabelText('Strikethrough');

        // Click underline button and Verify
        fireEvent.click(underlineButton);
        expect(updateStyle).toHaveBeenCalledWith({ textDecoration: 'underline'});

        // Verify that the callback updates the tracked data to state.
        act(() => {
            vi.mocked(formattedTextHelper.default).mock.calls[0][0].retrieveTrackedDataCallBack(['underline']);
        });

        // Click strike through button and Verify
        fireEvent.click(strikeButton);
        expect(updateStyle).toHaveBeenCalledWith({ textDecoration: 'underline line-through'});

        // Verify that the callback updates the tracked data to state.
        act(() => {
            vi.mocked(formattedTextHelper.default).mock.calls[0][0].retrieveTrackedDataCallBack(['underline line-through']);
        });

        // Check that both buttons have 'aria-selected' attribute set to 'true'
        underlineButton = screen.getByLabelText('Underline');
        strikeButton = screen.getByLabelText('Strikethrough');
        expect(underlineButton).toHaveAttribute('aria-selected', 'true');
        expect(strikeButton).toHaveAttribute('aria-selected', 'true');

        // Toggle off underline
        fireEvent.click(underlineButton);
        expect(updateStyle).toHaveBeenCalledWith({ textDecoration: 'line-through'});

        // Toggle off strike-through
        fireEvent.click(strikeButton);
        expect(updateStyle).toHaveBeenCalledWith({ textDecoration: 'underline'});
    })
})