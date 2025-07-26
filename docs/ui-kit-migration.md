# UI Kit Migration Guide

Этот документ описывает процесс миграции с Material-UI компонентов на кастомные компоненты из `src/shared/ui-kit`.

## Замененные компоненты

### Основные компоненты

| MUI Component | UI Kit Component | Статус |
|---------------|------------------|--------|
| `Paper` | `Paper` | ✅ Заменен |
| `Card` | `Card` | ✅ Заменен |
| `Typography` | `Typography` | ✅ Заменен |
| `Stack` | `Stack` | ✅ Заменен |
| `Box` | `Box` | ✅ Заменен |
| `Avatar` | `Avatar` | ✅ Заменен |
| `TextField` | `TextField` | ✅ Заменен |
| `FormHelperText` | `FormHelperText` | ✅ Заменен |
| `Button` | `Button` | ✅ Заменен |
| `Container` | `Container` | ✅ Заменен |

## Особенности миграции

### 1. Импорты

**До:**
```typescript
import { Paper, Typography, Stack, Box } from '@mui/material';
```

**После:**
```typescript
import { Paper, Typography, Stack, Box } from 'src/shared/ui-kit';
```

### 2. Пропсы

#### Paper
- `sx` заменен на `style`
- Поддерживает `width`, `height`, `padding`, `borderRadius`

#### Stack
- `spacing` заменен на `gap`
- `justifyContent` поддерживается
- `align` поддерживается

#### Typography
- Поддерживает `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body1`, `body2`, `button`
- `gutterBottom` поддерживается
- `color` поддерживается

#### Box
- `sx` заменен на `style`
- Поддерживает `padding`, `onClick`
- Поддерживает все flexbox свойства

#### Button
- Использует `label` вместо `children`
- `onClick` обязателен
- `sx` заменен на `style`

#### TextField
- Поддерживает `label`, `variant`, `error`, `helperText`
- `fullWidth`, `size` поддерживаются
- `sx` заменен на `style`

#### Avatar
- Поддерживает `src`, `alt`, `width`, `height`
- `sx` заменен на `style`
- `variant` поддерживается (`circular`, `rounded`, `square`)

### 3. Темы

Все компоненты поддерживают CSS переменные из:
- `src/shared/themes/darkTheme.css`
- `src/shared/themes/lightTheme.css`
- `src/index.css`

## Автоматическая замена

Для автоматической замены импортов используйте скрипт:

```bash
node scripts/replace-mui-imports.cjs
```

## Ручные исправления

После автоматической замены может потребоваться ручная корректировка:

1. Заменить `sx` на `style`
2. Заменить `spacing` на `gap` в Stack
3. Исправить пропсы Button (использовать `label` вместо `children`)
4. Проверить совместимость пропсов

## Примеры

### Paper
```typescript
// До
<Paper sx={{ padding: 2, backgroundColor: 'primary.main' }}>
  Content
</Paper>

// После
<Paper style={{ padding: '16px', backgroundColor: 'var(--color-primary)' }}>
  Content
</Paper>
```

### Stack
```typescript
// До
<Stack spacing={2} justifyContent="center">
  <Typography>Item 1</Typography>
  <Typography>Item 2</Typography>
</Stack>

// После
<Stack gap={2} justifyContent="center">
  <Typography>Item 1</Typography>
  <Typography>Item 2</Typography>
</Stack>
```

### Button
```typescript
// До
<Button variant="contained" onClick={handleClick}>
  Click me
</Button>

// После
<Button variant="contained" label="Click me" onClick={handleClick} />
```

## Storybook

Все компоненты имеют Storybook документацию в папке `src/shared/ui-kit/[ComponentName]/[ComponentName].stories.tsx`

Запустите Storybook для просмотра всех компонентов:

```bash
npm run storybook
``` 