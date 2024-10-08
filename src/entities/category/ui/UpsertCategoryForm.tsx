import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Colorful } from '@uiw/react-color';
import { useEffect, useState } from 'react';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import { createCategory, TCategory, TCreateCategoryInput, updateCategory } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import getRandomHexColor from 'src/utils/helpers/getRandomHexColor.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('categories');

  const closeModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleSuccess = useStableCallback((category: TCategory) => {
    fetchCategories();
    setCurrentEditingCategory(undefined);

    if (setSelectedCategory) {
      setSelectedCategory(category._id);
    }

    closeModal();
  });

  const { mutate: createCategoryMutate, isPending: isCreateCategoryPending } = useMutation({
    mutationFn: createCategory,
    onError: (error) => handleError(error),
    onSuccess: handleSuccess,
  });

  const { mutate: updateCategoryMutate, isPending: isUpdateCategoryPending } = useMutation<
    TCategory,
    TErrorResponse,
    TCreateCategoryInput & { _id: string }
  >({
    mutationFn: ({ _id, ...data }) => updateCategory(_id, data),
    onError: (error) => handleError(error),
    onSuccess: handleSuccess,
  });

  const upsertCategory = () => {
    if (category?._id) {
      updateCategoryMutate({ color, title, comments, _id: category._id });
    } else {
      createCategoryMutate({ color, title, comments });
    }
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
        {t('Save category')}
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
            {t('Random Color')}
          </Button>
          <FormControl disabled={isPending}>
            <InputLabel size="small">{t('Title')}</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl disabled={isPending}>
            <InputLabel size="small">{t('Comments')}</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button variant="outlined" type="submit" onClick={upsertCategory} disabled={isPending}>
            {category?._id ? t('Update') : t('Create')}
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default UpsertCategoryForm;
