import { describe, expect, it } from 'vitest';
import getRandomHexColor from 'src/utils/helpers/getRandomHexColor.ts';

describe('getRandomHexColor', () => {
  it('должен возвращать строку, начинающуюся с #', () => {
    const color = getRandomHexColor();
    expect(color.startsWith('#')).toBe(true);
  });

  it('должен быть длиной 7 символов', () => {
    const color = getRandomHexColor();
    expect(color).toHaveLength(7);
  });

  it('должен содержать только hex-символы после #', () => {
    const color = getRandomHexColor();
    const hexPart = color.slice(1);
    expect(hexPart).toMatch(/^[0-9a-f]{6}$/i);
  });

  it('должен возвращать разные значения при нескольких вызовах', () => {
    const color1 = getRandomHexColor();
    const color2 = getRandomHexColor();
    expect(color1).not.toBe(color2);
  });
});
