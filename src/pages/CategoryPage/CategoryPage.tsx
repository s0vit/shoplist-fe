import { Box, Divider, Paper, Typography } from '@mui/material';
import CategoriesGrid from 'src/entities/category/ui/CategoriesGrid.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';

const CategoryPage = () => {
  const { userCategories, isCategoriesLoading } = useLoadCategories();

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h3">Categories</Typography>
        <Divider />
        <br />
        {isCategoriesLoading && <Typography>Loading...</Typography>}
        {userCategories && <CategoriesGrid categories={userCategories} />}
      </Box>
    </Paper>
  );
};

export default CategoryPage;
