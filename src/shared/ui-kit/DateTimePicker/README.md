# DateTimePicker

Кастомный компонент для выбора даты и времени, построенный на основе `react-day-picker` и `date-fns`.

## Особенности

- **Локализация**: Поддержка русского и английского языков
- **Модальное окно**: Календарь открывается в модальном окне
- **Выбор времени**: Встроенный выбор времени
- **Форматирование**: Автоматическое форматирование даты согласно локали
- **Ограничения**: Возможность отключить будущие даты

## Использование

```tsx
import { DateTimePicker } from 'src/shared/ui-kit';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <DateTimePicker
      label="Выберите дату и время"
      value={selectedDate}
      onChange={setSelectedDate}
      disableFuture
    />
  );
}
```

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|---------------|----------|
| `label` | `string` | - | Подпись для поля ввода |
| `value` | `Date \| undefined` | - | Выбранная дата |
| `onChange` | `(date: Date \| undefined) => void` | - | Обработчик изменения даты |
| `disableFuture` | `boolean` | `false` | Отключить выбор будущих дат |
| `disabled` | `boolean` | `false` | Отключить компонент |
| `style` | `React.CSSProperties` | - | Дополнительные стили |
| `className` | `string` | - | CSS класс |

## Локализация

Компонент автоматически использует текущую локаль из i18next:

- **Русский**: Месяцы, дни недели и форматирование на русском языке
- **Английский**: Месяцы, дни недели и форматирование на английском языке

### Переводы

Добавлены переводы для текста "Time" в файлы локализации:

```json
// locales/en/translation.json
{
  "Time": "Time"
}

// locales/ru/translation.json
{
  "Time": "Время"
}
```

### Автоматическое переключение

Компонент автоматически переключается между локалями при изменении языка в приложении.

## Архитектура

- `DateTimePicker.tsx` - основной компонент
- `locales.ts` - конфигурация локализации
- `index.ts` - экспорты
- `DateTimePicker.stories.tsx` - Storybook stories

## Зависимости

- `react-day-picker` - календарь
- `date-fns` - работа с датами
- `react-i18next` - локализация
- `styled-components` - стилизация 