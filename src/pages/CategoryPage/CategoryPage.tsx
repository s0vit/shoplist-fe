import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import CategoriesGrid from 'src/entities/category/ui/CategoriesGrid.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';

const CategoryPage = () => {
  const { userCategories, isCategoriesLoading, fetchCategories } = useLoadCategories();
  const { t } = useTranslation('categories');
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

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
        {userCategories && <CategoriesGrid categories={userCategories} refetchCategories={fetchCategories} />}
      </Box>
    </Paper>
  );
};

export default CategoryPage;
