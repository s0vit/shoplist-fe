import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import SkeletonGroup from 'src/utils/components/Skeleton.tsx';

describe('Skeleton component', () => {
  it('renders correctly', () => {
    const { container } = render(<SkeletonGroup />);
    const skeletons = container.querySelectorAll('[data-testid^="skeletonExpenses"]');
    expect(skeletons.length).toBe(3);
  });
  it('renders correct number of skeletons', () => {
    const { container } = render(<SkeletonGroup count={5} />);
    const skeletons = container.querySelectorAll('[data-testid^="skeletonExpenses"]');
    expect(skeletons.length).toBe(5);
  });
  it('matches snapshot', () => {
    const rendered = render(<SkeletonGroup />);
    expect(rendered).toMatchSnapshot();
  });
});
