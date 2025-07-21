# UI-Kit Imports

## Правила импорта

Все компоненты, типы и утилиты из UI-kit должны импортироваться только из рутового файла:

```typescript
// ✅ Правильно
import { Button, Typography, Box, type TOption } from 'src/shared/ui-kit';

// ❌ Неправильно
import Button from 'src/shared/ui-kit/Button/Button';
import Typography from 'src/shared/ui-kit/Typography/Typography';
```

## ESLint правило

Установлено правило `no-restricted-imports`, которое запрещает точечные импорты из UI-kit:

```javascript
'no-restricted-imports': [
  'error',
  {
    patterns: [
      {
        group: ['src/shared/ui-kit/*'],
        message: 'Please import from "src/shared/ui-kit" instead of individual files.',
      },
    ],
  },
],
```

## Доступные экспорты

### Компоненты
- `Box`
- `Button`
- `ButtonGroup`
- `CalculatorButton`
- `Card`
- `Category`
- `Grid`
- `Icon`
- `IconButton`
- `Input`
- `Select`
- `Stack`
- `Toggle`
- `Typography`

### Типы
- `TIconName`, `TIconSize` - из Icon
- `TIconButtonProps` - из IconButton
- `TInputProps` - из Input
- `TSelectProps`, `TOption` - из Select
- `CalculatorButtonProps` - из CalculatorButton
- `TCategoryProps`, `TCategoryName` - из Category
- `categoryColorPresets` - предустановленные цвета (автоматически адаптируются к теме)

### Утилиты
- `alpha`, `setAlpha` - функции для работы с цветами

## Автоматическое исправление

Для автоматического исправления импортов используйте команду:

```bash
npm run fix-ui-kit-imports
```

Этот скрипт найдет все точечные импорты из UI-kit и заменит их на импорты из рутового файла.

## Примеры использования

```typescript
// Импорт компонентов
import { Button, Typography, Box } from 'src/shared/ui-kit';

// Импорт типов
import { type TOption, type TIconName } from 'src/shared/ui-kit';

// Импорт утилит
import { alpha } from 'src/shared/ui-kit';

// Комбинированный импорт
import { Button, Typography, type TOption, alpha } from 'src/shared/ui-kit';
``` 