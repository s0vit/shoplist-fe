import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import SkeletonGroup from 'src/utils/components/Skeleton.tsx';

describe('Skeleton component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<SkeletonGroup />);
    const stack = getByTestId('skeletonStack');
    const skeletons = stack.querySelectorAll('[data-testid^="skeletonExpenses"]');
    expect(skeletons.length).toBe(3);
  });

  it('renders correct number of skeletons', () => {
    const { getByTestId } = render(<SkeletonGroup count={5} />);
    const stack = getByTestId('skeletonStack');
    const skeletons = stack.querySelectorAll('[data-testid^="skeletonExpenses"]');
    expect(skeletons.length).toBe(5);
  });

  it('renders correct variants', () => {
    const { getByTestId } = render(<SkeletonGroup variant="circular" />);
    const skeleton = getByTestId('skeletonExpenses-0');
    expect(skeleton.className).toMatch(/MuiSkeleton-circular/);
  });

  it('applies column direction to Stack', () => {
    const { getByTestId } = render(<SkeletonGroup dimensions={{ direction: 'column' }} />);
    const stack = getByTestId('skeletonStack');
    expect(getComputedStyle(stack).flexDirection).toBe('column');
  });

  it('applies correct width and height to Skeleton elements', () => {
    const { getByTestId } = render(<SkeletonGroup dimensions={{ width: 100, height: '50px' }} />);
    const skeleton = getByTestId('skeletonExpenses-0');
    const styles = getComputedStyle(skeleton);
    expect(styles.width).toBe('100px');
    expect(styles.height).toBe('50px');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SkeletonGroup />);
    expect(asFragment()).toMatchSnapshot();
  });
});
