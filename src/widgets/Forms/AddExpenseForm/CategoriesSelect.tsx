import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useState } from 'react';
import AddCategoryModal from 'src/widgets/Modal/AddCategoryModal/AddCategoryModal.tsx';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import selectUserCategories from 'src/entities/category/model/selectors/selectUserCategories.ts';

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
  const categories = useCategoryStore(selectUserCategories);

  const selectedCategory = categories?.find((category) => category._id === selectedCategoryId);

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
          onChange={(_e, value) => setSelectedCategoryId(value?._id || '')}
          getOptionLabel={(option) => option.title}
        />
        <IconButton aria-label="add" disabled={isCreateExpensePending} onClick={() => setIsAddCategoryModalOpen(true)}>
          <AddCircle />
        </IconButton>
      </Stack>
      {isAddCategoryModalOpen && <AddCategoryModal closeCategoryModal={() => setIsAddCategoryModalOpen(false)} />}
    </>
  );
};

export default CategoriesSelect;
