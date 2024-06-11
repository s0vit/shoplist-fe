import { Grid } from '@mui/material';
import { TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import CategoryCard from 'src/entities/category/ui/CategoryCard.tsx';

type TCategoriesProps = {
  categories: TGetCategoriesResponse;
};

const Categories = ({ categories }: TCategoriesProps) => {
  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </Grid>
  );
};

export default Categories;
