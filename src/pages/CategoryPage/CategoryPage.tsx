import { Box, Divider, Paper, Typography } from '@mui/material';
import CategoriesGrid from 'src/entities/category/ui/CategoriesGrid.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import { useTranslation } from 'react-i18next';

const CategoryPage = () => {
  const { userCategories, isCategoriesLoading, fetchCategories } = useLoadCategories();
  const { t } = useTranslation('categories');

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h3">{t('Categories')}</Typography>
        <Divider />
        <br />
        {isCategoriesLoading && <Typography>{t('Loading...')}</Typography>}
        {userCategories && <CategoriesGrid categories={userCategories} refetchCategories={fetchCategories} />}
      </Box>
    </Paper>
  );
};

export default CategoryPage;
