import { AddCircle } from '@mui/icons-material';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import { Stack } from 'src/shared/ui-kit';

import { SyntheticEvent } from 'react';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import UpsertCategoryModal from 'src/widgets/Modal/UpsertCategoryModal';
import { useTranslation } from 'react-i18next';

type TCategoriesSelectProps = {
  selectedCategoryId: string;
  setSelectedCategoryId: (value: string) => void;
  isCreateExpensePending?: boolean;
};

const CategoriesSelect = ({
  selectedCategoryId,
  setSelectedCategoryId,
  isCreateExpensePending,
}: TCategoriesSelectProps) => {
  const categories = useCategoryStore.use.userCategories();
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();
  const { t } = useTranslation('homePage');

  const onAutocompleteChange = useStableCallback((_e: SyntheticEvent, value: TCategory | null) => {
    if (value === null || categories?.some((category) => category._id === value._id)) {
      setSelectedCategoryId(value?._id || '');
    } else {
      setSelectedCategoryId('');
    }
  });

  const selectedCategory = categories?.find((category) => category._id === selectedCategoryId) || null;

  return (
    <>
      <Stack direction="row" align="flex-end">
        <Autocomplete
          size="small"
          fullWidth
          disabled={isCreateExpensePending}
          disablePortal
          options={categories || []}
          renderInput={(params) => <TextField {...params} label={t('Category')} />}
          value={selectedCategory}
          onChange={onAutocompleteChange}
          getOptionLabel={(option) => option.title}
        />
        <IconButton aria-label="add" disabled={isCreateExpensePending} onClick={() => setIsCategoryModalOpen(true)}>
          <AddCircle />
        </IconButton>
      </Stack>
      <UpsertCategoryModal />
    </>
  );
};

export default CategoriesSelect;
