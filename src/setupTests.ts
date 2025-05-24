import '@testing-library/jest-dom';
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Расширяем expect матчерами из testing-library
expect.extend(matchers);

// Выполняем очистку после каждого теста
afterEach(() => {
  cleanup();
});
