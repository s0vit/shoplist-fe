import { render, screen, cleanup } from '@testing-library/react';
import Loader from 'src/utils/components/Loader.tsx';
import { describe, expect, it, afterEach, beforeEach } from 'vitest';

let renderResult: ReturnType<typeof render>;

const renderWithTheme = () => {
  return render(<Loader />);
};

describe('Loader', () => {
  beforeEach(() => {
    renderResult = renderWithTheme();
  });

  afterEach(() => {
    cleanup();
  });

  it('render loading img correctly', () => {
    const img = screen.getByAltText(/loading/i);
    expect(img).not.toBeNull();
    expect(img.tagName).toBe('IMG');
  });

  it('container with all styles exists', () => {
    const img = screen.getByAltText(/loading/i);
    const box = img.closest('div');
    expect(box).not.toBeNull();

    const styles = window.getComputedStyle(box!);
    expect(styles.width).toMatch(/\d+px/);
    expect(styles.height).toMatch(/\d+px/);
    expect(styles.position).toBe('fixed');
    expect(styles.zIndex).toBe('9999');
    expect(styles.backdropFilter).toBe('blur(5px)');
  });

  it('matches snapshot', () => {
    expect(renderResult.asFragment()).toMatchSnapshot();
  });
});
