import { Grid } from '@mui/material';
import { deleteCategory, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import CategoryCard from 'src/entities/category/ui/CategoryCard.tsx';
import handleError from 'src/utils/errorHandler.ts';
import { useMutation } from '@tanstack/react-query';

type TCategoriesProps = {
  categories: TGetCategoriesResponse;
  refetchCategories: () => void;
};

const Categories = ({ categories, refetchCategories }: TCategoriesProps) => {
  const { mutate: requestDeleteCategory } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => handleError(error),
    onSuccess: refetchCategories,
  });

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} handleRemove={() => requestDeleteCategory(category._id)} />
      ))}
    </Grid>
  );
};

export default Categories;
