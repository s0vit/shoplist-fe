import { alpha, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { TCategory } from 'src/shared/api/categoryApi.ts';

type TCategoriesProps = {
  category: TCategory;
};

const CategoryCard = ({ category }: TCategoriesProps) => {
  const theme = useTheme();
  const categoryTextColor = theme.palette.getContrastText(category.color || theme.palette.primary.main);
  const categoryBackgroundColor = alpha(category.color || theme.palette.primary.main, 0.8);

  return (
    <Grid item xs={12} sm={6} md={4} key={category._id}>
      <Card style={{ backgroundColor: categoryBackgroundColor }}>
        <CardContent>
          <Typography variant="h5" component="div" color={categoryTextColor}>
            {category.title}
          </Typography>
          {category.comments && (
            <Typography variant="body2" color={categoryTextColor}>
              {category.comments}
            </Typography>
          )}
          <Typography variant="body2" color={categoryTextColor}>
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryCard;
