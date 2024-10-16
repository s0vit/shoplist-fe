import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import CategoriesGrid from 'src/entities/category/ui/CategoriesGrid.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import { useTranslation } from 'react-i18next';
import DeleteCategoryDialog from 'src/widgets/Modal/DeleteCategoryDialog.tsx';
import { deleteCategory, TCategory } from 'src/shared/api/categoryApi.ts';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import handleError from 'src/utils/errorHandler.ts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';

const CategoryPage = () => {
  const { userCategories, isCategoriesLoading, fetchCategories } = useLoadCategories();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<TCategory>();
  const { t } = useTranslation('categories');
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

  const handleOpenDeleteDialog = (category: TCategory) => {
    setOpenDeleteDialog(true);
    setDeletingCategory(category);
  };

  const { mutate: requestDeleteCategory, isPending: isUpdating } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => handleError(error),
    onSuccess: async () => {
      await fetchCategories();
      setOpenDeleteDialog(false);
      setDeletingCategory(undefined);
    },
  });

  return (
    <Paper>
      <Box padding={2} style={{ position: 'relative' }}>
        <Typography variant="h3">{t('Categories')}</Typography>
        <IconButton
          size="small"
          disabled={false}
          color="primary"
          onClick={() => {
            setIsCategoryModalOpen(true);
          }}
          style={{ position: 'absolute', right: '20px', top: '26px' }}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>

        <Divider />
        <br />
        {isCategoriesLoading && <Typography>{t('Loading...')}</Typography>}
        {userCategories && (
          <CategoriesGrid categories={userCategories} handleOpenDeleteDialog={handleOpenDeleteDialog} />
        )}
        <DeleteCategoryDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          handleConfirmDelete={requestDeleteCategory}
          item={deletingCategory}
          isUpdating={isUpdating}
        />
      </Box>
    </Paper>
  );
};

export default CategoryPage;
