import { Divider, IconButton } from '@mui/material';
import { Paper, Typography, Box } from 'src/shared/ui-kit';

import CategoriesGrid from 'src/entities/category/ui/CategoriesGrid.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import { useTranslation } from 'react-i18next';
import DeleteCategoryDialog from 'src/widgets/Modal/DeleteCategoryDialog.tsx';
import { deleteCategory, TCategory } from 'src/shared/api/categoryApi.ts';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import handleError from 'src/utils/errorHandler.ts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import useUpdateCategoryOrder from 'src/entities/category/hooks/useUpdateCategoryOrder.ts';
import styles from './CategoryPage.module.scss';

const CategoryPage = () => {
  const { userCategories, isCategoriesLoading, fetchCategories } = useLoadCategories();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [displayCategories, setDisplayCategories] = useState<TCategory[]>([]);
  const [deletingCategory, setDeletingCategory] = useState<TCategory>();
  const { t } = useTranslation('categories');
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

  const handleOpenDeleteDialog = (category: TCategory) => {
    setOpenDeleteDialog(true);
    setDeletingCategory(category);
  };

  useEffect(() => {
    if (userCategories) {
      setDisplayCategories(userCategories);
    }
  }, [userCategories]);

  const { mutate: updateOrder } = useUpdateCategoryOrder();

  const handleReorder = (reorderedSources: TPaymentSource[], movedId: string, newIndex: number) => {
    setDisplayCategories(reorderedSources);
    updateOrder({ id: movedId, newIndex });
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
      <Box className={styles.rootBox}>
        <Typography variant="h3">{t('Categories')}</Typography>
        <IconButton
          size="small"
          disabled={false}
          color="primary"
          onClick={() => setIsCategoryModalOpen(true)}
          className={styles.addButton}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>

        <Divider />
        <br />
        {isCategoriesLoading && <Typography>{t('Loading...')}</Typography>}
        {userCategories && (
          <CategoriesGrid
            categories={displayCategories}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
            onReorder={handleReorder}
          />
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
