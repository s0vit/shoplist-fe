import { alpha, Box, Card, CardContent, Grid, Stack, Typography, useTheme } from '@mui/material';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { Delete, Edit } from '@mui/icons-material';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';

type TCategoriesProps = {
  category: TCategory;
  handleRemove: () => void;
};

const CategoryCard = ({ category, handleRemove }: TCategoriesProps) => {
  const setCurrentEditingCategory = useCategoryStore.use.setCurrentEditingCategory();
  const setCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

  const theme = useTheme();
  const categoryTextColor = theme.palette.text.primary;
  const categoryBackgroundColor = alpha(category.color || theme.palette.primary.main, 0.05);

  const handleEdit = () => {
    setCategoryModalOpen(true);
    setCurrentEditingCategory(category);
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleEdit}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height="100%"
          sx={{
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
          }}
        >
          <Edit />
        </Stack>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleRemove}>
        <Stack
          alignItems="center"
          height="100%"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
          }}
        >
          <Delete />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Grid item xs={12}>
      <SwipeableList type={Type.IOS} fullSwipe style={{ height: 'auto' }}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Card
            sx={{
              backgroundColor: categoryBackgroundColor,
              border: `1px solid ${category.color || theme.palette.primary.main}`,
              width: '100%',
              borderRadius: theme.spacing(1),
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" component="div" color={categoryTextColor}>
                  {category.title}
                </Typography>
                <Typography variant="body2" color={categoryTextColor}>
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              {category.comments && (
                <Typography variant="body2" color={categoryTextColor}>
                  {category.comments}
                </Typography>
              )}
            </CardContent>
          </Card>
        </SwipeableListItem>
      </SwipeableList>
    </Grid>
  );
};

export default CategoryCard;
