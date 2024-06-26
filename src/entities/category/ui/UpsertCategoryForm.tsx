import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createCategory, TCategory, TCreateCategoryInput, updateCategory } from 'src/shared/api/categoryApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import { Colorful } from '@uiw/react-color';
import getRandomHexColor from 'src/utils/helpers/getRandomHexColor.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';

type TUpsertCategoryFormProps = {
  setSelectedCategory?: (categoryId: string) => void;
};

const UpsertCategoryForm = ({ setSelectedCategory }: TUpsertCategoryFormProps) => {
  const category = useCategoryStore.use.currentEditingCategory?.();
  const setCurrentEditingCategory = useCategoryStore.use.setCurrentEditingCategory();
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

  const [color, setColor] = useState(category?.color || getRandomHexColor());
  const [title, setTitle] = useState(category?.title || '');
  const [comments, setComments] = useState(category?.comments || '');
  const { fetchCategories } = useLoadCategories();
  const theme = useTheme();

  const closeModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleSuccess = useStableCallback((category: TCategory) => {
    fetchCategories();
    setCurrentEditingCategory(undefined);
    setSelectedCategory && setSelectedCategory(category._id);
    closeModal();
  });

  const { mutate: createCategoryMutate, isPending: isCreateCategoryPending } = useMutation({
    mutationFn: createCategory,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { mutate: updateCategoryMutate, isPending: isUpdateCategoryPending } = useMutation<
    TCategory,
    TErrorResponse,
    TCreateCategoryInput & { _id: string }
  >({
    mutationFn: ({ _id, ...data }) => updateCategory(_id, data),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const upsertCategory = () => {
    category?._id
      ? updateCategoryMutate({ color, title, comments, _id: category._id })
      : createCategoryMutate({ color, title, comments });
  };

  const isPending = isCreateCategoryPending || isUpdateCategoryPending;

  useEffect(() => {
    if (category) {
      setColor(category?.color || getRandomHexColor());
      setTitle(category?.title || '');
      setComments(category?.comments || '');
    }
  }, [category]);

  return (
    <FormWrapper>
      <Typography variant="h5" textAlign="center">
        Add category
      </Typography>
      <FormGroup>
        <Stack gap={1} paddingY={2}>
          <Colorful color={color} onChange={(color) => setColor(color.hex)} disableAlpha style={{ width: '100%' }} />
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: color, color: theme.palette.getContrastText(color) }}
            onClick={() => setColor(getRandomHexColor())}
          >
            Random Color
          </Button>
          <FormControl disabled={isPending}>
            <InputLabel size="small">Title</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl disabled={isPending}>
            <InputLabel size="small">Comments</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button variant="outlined" type="submit" onClick={upsertCategory} disabled={isPending}>
            {category?._id ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default UpsertCategoryForm;
