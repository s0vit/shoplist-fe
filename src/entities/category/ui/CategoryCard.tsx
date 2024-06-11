import { alpha, Card, CardContent, Grid, Typography } from '@mui/material';
import { TCategory } from 'src/shared/api/categoryApi.ts';

type TCategoriesProps = {
  category: TCategory;
};

const CategoryCard = ({ category }: TCategoriesProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={category._id}>
      <Card style={{ backgroundColor: alpha(category.color || 'fff', 0.8) }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {category.title}
          </Typography>
          {category.comments && (
            <Typography variant="body2" color="textSecondary">
              {category.comments}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary">
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryCard;
