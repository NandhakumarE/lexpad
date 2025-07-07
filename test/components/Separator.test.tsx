import React from "react";
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Separator from '../../src/components/Separator';

describe('Separator', () => {
    it("Should render properly", () => {
        const { container } = render(<Separator/>)
        const div = container.firstChild as HTMLDivElement;

        expect(div).toBeInTheDocument();
        expect(div).toHaveClass('h-6');
        expect(div).toHaveClass('w-[1px]');
        expect(div).toHaveClass('bg-gray-400');
        expect(div).toHaveClass('m-l-1.5');
        expect(div).toHaveClass('m-r-1.5');

    })
})