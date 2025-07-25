import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import SkeletonGroup from 'src/utils/components/Skeleton.tsx';

describe('Skeleton component', () => {
  afterEach(() => {
    cleanup();
  });

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

  it('renders correct variants', () => {
    const { getByTestId } = render(<SkeletonGroup variant="circular" />);
    const skeleton = getByTestId('skeletonExpenses-0');
    expect(skeleton.className).toMatch(/MuiSkeleton-circular/);
  });

  it('applies column direction to Stack', () => {
    const { container } = render(<SkeletonGroup dimensions={{ direction: 'column' }} />);
    const stack = container.firstChild as HTMLElement;
    expect(getComputedStyle(stack).flexDirection).toBe('column');
  });

  it('applies correct width and height to Skeleton elements', () => {
    const { getByTestId } = render(<SkeletonGroup dimensions={{ width: 100, height: '50px' }} />);
    const skeleton = getByTestId('skeletonExpenses-0') as HTMLElement;
    const styles = getComputedStyle(skeleton);
    expect(styles.width).toBe('100px');
    expect(styles.height).toBe('50px');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SkeletonGroup />);
    expect(asFragment()).toMatchSnapshot();
  });
});
