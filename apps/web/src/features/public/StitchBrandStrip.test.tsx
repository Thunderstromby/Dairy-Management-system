import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StitchBrandStrip } from './StitchBrandStrip';

describe('StitchBrandStrip', () => {
  it('renders the static signature strip without a marquee', () => {
    const { container } = render(<StitchBrandStrip />);

    expect(screen.getAllByText('SMART FARM')).toHaveLength(6);
    expect(container.querySelector('.sf-stitch-brand-strip')).not.toBeNull();
    expect(container.querySelector('.marquee-track')).toBeNull();
  });
});
