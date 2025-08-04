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
