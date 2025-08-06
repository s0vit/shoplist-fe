/**
 * Создает цвет с заданной прозрачностью
 * @param color - цвет в формате hex, rgb, rgba или названия цвета
 * @param alpha - значение прозрачности от 0 до 1
 * @returns цвет с заданной прозрачностью в формате rgba
 */
export const setAlpha = (color: string, alpha: number): string => {
  // Проверяем валидность alpha
  const validAlpha = Math.max(0, Math.min(1, alpha));

  // Если цвет уже в формате rgba, извлекаем rgb компоненты
  if (color.startsWith('rgba(')) {
    const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
    if (rgbaMatch) {
      const rgbValues = rgbaMatch[1].split(',').map((v) => v.trim());
      const r = parseInt(rgbValues[0]);
      const g = parseInt(rgbValues[1]);
      const b = parseInt(rgbValues[2]);

      return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
    }
  }

  // Если цвет в формате rgb
  if (color.startsWith('rgb(')) {
    const rgbMatch = color.match(/rgb\(([^)]+)\)/);
    if (rgbMatch) {
      const rgbValues = rgbMatch[1].split(',').map((v) => v.trim());
      const r = parseInt(rgbValues[0]);
      const g = parseInt(rgbValues[1]);
      const b = parseInt(rgbValues[2]);

      return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
    }
  }

  // Если цвет в формате hex
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
  }

  // Для названий цветов используем canvas для получения rgb значений
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1);
    const [r, g, b] = imageData.data;

    return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
  }

  // Fallback - возвращаем исходный цвет если не удалось обработать
  return color;
};

/**
 * Алиас для setAlpha для совместимости с MUI alpha
 */
export const alpha = setAlpha;

/**
 * Создает белый или черный цвет в зависимости от фона
 * @param color - цвет в формате hex, rgb, rgba или названия цвета
 * @returns белый или черный цвет в зависимости от фона
 * Если цвет является переменной, то используем window.getComputedStyle для получения цвета
 * Конвертирует пиксельное значение цвета в hex из rgb/rgba
 */
export const getContrastColor = (color: string): 'black' | 'white' => {
  // Если цвет является CSS переменной, получаем вычисленное значение
  if (color.startsWith('var(')) {
    const tempEl = document.createElement('div');
    tempEl.style.color = color;
    document.body.appendChild(tempEl);
    const computedColor = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    color = computedColor;
  }

  // Функция для конвертации hex в RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Функция для парсинга RGB/RGBA строки
  const parseRgb = (rgb: string): { r: number; g: number; b: number } | null => {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      };
    }

    return null;
  };

  let r: number, g: number, b: number;

  // Нормализация цвета и удаление пробелов
  color = color.toLowerCase().trim();

  // Обработка hex цветов
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    if (!rgb) throw new Error(`Invalid hex color: ${color}`);
    ({ r, g, b } = rgb);
  }
  // Обработка rgb/rgba цветов
  else if (color.startsWith('rgb')) {
    const rgb = parseRgb(color);
    if (!rgb) throw new Error(`Invalid rgb color: ${color}`);
    ({ r, g, b } = rgb);
  }
  // Если цвет не распознан, пытаемся получить его через DOM
  else {
    const tempEl = document.createElement('div');
    tempEl.style.color = color;
    document.body.appendChild(tempEl);
    const computedColor = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);

    const rgb = parseRgb(computedColor);
    if (!rgb) throw new Error(`Unable to parse color: ${color}`);
    ({ r, g, b } = rgb);
  }

  // Вычисление относительной яркости по формуле WCAG
  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;

      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const luminance = getLuminance(r, g, b);

  // Если яркость больше 0.5, используем черный текст, иначе белый
  return luminance > 0.5 ? 'black' : 'white';
};
