import { describe, it, expect } from 'vitest';
import { create } from 'zustand';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

describe('createSelectors', () => {
  const useStoreBase = create(() => ({
    count: 42,
    user: { name: 'котёнок', age: 3 },
  }));

  const store = createSelectors(useStoreBase);

  it('должен иметь поле use', () => {
    expect(store.use).toBeDefined();
  });
});
