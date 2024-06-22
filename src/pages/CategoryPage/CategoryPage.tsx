import { Box, Divider, Paper, Typography } from '@mui/material';
import CategoriesGrid from 'src/entities/category/ui/CategoriesGrid.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import UpsertCategoryModal from 'src/entities/category/ui/UpsertCategoryModal.tsx';

const CategoryPage = () => {
  const { userCategories, isCategoriesLoading, fetchCategories } = useLoadCategories();

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h3">Categories</Typography>
        <Divider />
        <br />
        {isCategoriesLoading && <Typography>Loading...</Typography>}
        {userCategories && <CategoriesGrid categories={userCategories} refetchCategories={fetchCategories} />}
      </Box>
      <UpsertCategoryModal />
    </Paper>
  );
};

export default CategoryPage;
