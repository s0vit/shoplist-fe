import { Grid } from '@mui/material';
import { TCategory, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import CategoryCard from 'src/entities/category/ui/CategoryCard.tsx';

type TCategoriesProps = {
  categories: TGetCategoriesResponse;
  handleOpenDeleteDialog: (paymentSource: TCategory) => void;
};

const Categories = ({ categories, handleOpenDeleteDialog }: TCategoriesProps) => {

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} handleRemove={() => handleOpenDeleteDialog(category)} />
      ))}
    </Grid>
  );
};

export default Categories;
