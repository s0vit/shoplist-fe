import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AddCategoryModal from 'src/widgets/Modal/AddCategoryModal/AddCategoryModal.tsx';
import { getCategories, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { handleError } from 'src/utils/errorHandler.ts';

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
  //TODO move to state management and request on user enter
  const {
    isPending: isGetCategoriesPending,
    error: getCategoriesError,
    data: categories,
  } = useQuery<TGetCategoriesResponse, TErrorResponse>({ queryFn: getCategories, queryKey: ['categories'] });

  const selectedCategory = categories?.find((category) => category._id === selectedCategoryId);

  useEffect(() => {
    if (getCategoriesError) {
      handleError(getCategoriesError);
    }
  }, [getCategoriesError]);

  const isDisabled = isGetCategoriesPending || isCreateExpensePending;

  return (
    <>
      <Stack direction="row" alignItems="end">
        <Autocomplete
          size="small"
          fullWidth
          disabled={isDisabled}
          disablePortal
          options={categories || []}
          renderInput={(params) => <TextField {...params} label="Category" />}
          value={selectedCategory}
          onChange={(_e, value) => setSelectedCategoryId(value?._id || '')}
          getOptionLabel={(option) => option.title}
        />
        <IconButton aria-label="add" disabled={isDisabled} onClick={() => setIsAddCategoryModalOpen(true)}>
          <AddCircle />
        </IconButton>
      </Stack>
      {isAddCategoryModalOpen && <AddCategoryModal closeCategoryModal={() => setIsAddCategoryModalOpen(false)} />}
    </>
  );
};

export default CategoriesSelect;
