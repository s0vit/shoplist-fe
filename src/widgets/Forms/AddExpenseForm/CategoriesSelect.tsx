import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import AddCategoryModal from 'src/widgets/Modal/AddCategoryModal/AddCategoryModal.tsx';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';

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
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const categories = useCategoryStore.use.userCategories();

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
      <Stack direction="row" alignItems="end">
        <Autocomplete
          size="small"
          fullWidth
          disabled={isCreateExpensePending}
          disablePortal
          options={categories || []}
          renderInput={(params) => <TextField {...params} label="Category" />}
          value={selectedCategory}
          onChange={onAutocompleteChange}
          getOptionLabel={(option) => option.title}
        />
        <IconButton aria-label="add" disabled={isCreateExpensePending} onClick={() => setIsAddCategoryModalOpen(true)}>
          <AddCircle />
        </IconButton>
      </Stack>
      <AddCategoryModal
        closeCategoryModal={() => setIsAddCategoryModalOpen(false)}
        isCategoryModalOpen={isAddCategoryModalOpen}
      />
    </>
  );
};

export default CategoriesSelect;
