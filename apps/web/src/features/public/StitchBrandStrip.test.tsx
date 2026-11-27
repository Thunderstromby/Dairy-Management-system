import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StitchBrandStrip } from './StitchBrandStrip';

describe('StitchBrandStrip', () => {
  it('renders the approved CSS marquee signature strip', () => {
    const { container } = render(<StitchBrandStrip />);

    // Two identical groups produce a seamless -50% translation loop.
    expect(screen.getAllByText('SMART FARM')).toHaveLength(12);
    expect(container.querySelector('.sf-stitch-brand-strip')).not.toBeNull();
    expect(container.querySelector('.sf-stitch-marquee')).not.toBeNull();
  });
});
