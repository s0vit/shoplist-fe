import { describe, it, expect } from 'vitest';
import emailToHexColor from './../emailToHexColor';

describe('emailToHexColor', () => {
  it('должен возвращать HEX-цвет', () => {
    const color = emailToHexColor('kotyonok@example.com');
    expect(color).toMatch(/^#[0-9A-F]{6}$/); // шаблон HEX
  });

  it('должен возвращать одинаковый цвет для одного и того же email', () => {
    const email = 'kotyonok@example.com';
    const color1 = emailToHexColor(email);
    const color2 = emailToHexColor(email);
    expect(color1).toBe(color2);
  });

  it('должен возвращать разные цвета для разных email (в большинстве случаев)', () => {
    const color1 = emailToHexColor('one@example.com');
    const color2 = emailToHexColor('two@example.com');
    expect(color1).not.toBe(color2);
  });

  it('корректно работает с пустой строкой', () => {
    const color = emailToHexColor('');
    expect(color).toMatch(/^#[0-9A-F]{6}$/);
  });
});
