import { alpha, useTheme } from '@mui/material';
import { Typography, Card, IconButton } from 'src/shared/ui-kit';

import { Box, Grid, Stack } from 'src/shared/ui-kit';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { Icon } from 'src/shared/ui-kit';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import ItemMenu from 'src/widgets/ItemMenu/ItemMenu';
import { MouseEvent, useState } from 'react';
import useLongPress from 'src/utils/hooks/useLongPress.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import ShareWithModal from 'src/widgets/Modal/ShareWithModal.tsx';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './CategoryCard.module.scss';

type TCategoriesProps = {
  category: TCategory;
  handleRemove: () => void;
};

const CategoryCard = ({ category, handleRemove }: TCategoriesProps) => {
  const setCurrentEditingCategory = useCategoryStore.use.setCurrentEditingCategory();
  const setCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [isShareWithModalOpen, setIsShareWithModalOpen] = useState(false);

  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();
  const categoryTextColor = theme.palette.text.primary;
  const categoryBackgroundColor = alpha(category.color || theme.palette.primary.main, 0.05);
  const { t } = useTranslation('categories');
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category._id,
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const handleEdit = () => {
    setCategoryModalOpen(true);
    setCurrentEditingCategory(category);
  };

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLElement && isDesktopWidth) {
      setContextMenuCoordinates(
        contextMenuCoordinates === null ? { mouseX: event.clientX || 0, mouseY: event.clientY } : null,
      );
    }
  };

  const longPressEvents = useLongPress(
    (e) =>
      setContextMenuCoordinates(
        contextMenuCoordinates === null ? { mouseX: e.touches[0].clientX, mouseY: e.touches[0].clientY } : null,
      ),
    400,
  );

  const handleCloseMenu = () => {
    setContextMenuCoordinates(null);
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleEdit}>
        <Stack
          className={styles.editStack}
          style={
            {
              '--edit-bg': theme.palette.info.main,
              '--edit-color': theme.palette.info.contrastText,
            } as React.CSSProperties
          }
        >
          <Icon name="pencilSquare" size="md" />
        </Stack>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleRemove}>
        <Stack
          className={styles.deleteStack}
          style={
            {
              '--delete-bg': theme.palette.error.main,
              '--delete-color': theme.palette.error.contrastText,
            } as React.CSSProperties
          }
        >
          <Icon name="trash" size="md" />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Grid
      item
      size={{ xs: 12 }}
      onContextMenu={handleOpenMenu}
      {...longPressEvents}
      ref={setNodeRef}
      className={styles.sortable}
      style={
        {
          '--sortable-transition': style.transition,
          '--sortable-transform': style.transform,
        } as React.CSSProperties
      }
      {...attributes}
      {...listeners}
    >
      <SwipeableList type={Type.IOS} fullSwipe style={{ height: 'auto' }}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Card
            style={{
              backgroundColor: categoryBackgroundColor,
              border: `1px solid ${category.color || theme.palette.primary.main}`,
              width: '100%',
              borderRadius: theme.spacing(1),
            }}
          >
            <Box style={{ padding: 8 }} className={styles.cardContent}>
              <Box className={styles.headerBox}>
                <Typography variant="h3" color={categoryTextColor}>
                  {category.title}
                </Typography>
                <Box className={styles.columnEndBox}>
                  <Typography variant="body2" color={categoryTextColor}>
                    {t('Created: ') + `${new Date(category.createdAt).toLocaleDateString()}`}
                  </Typography>
                  <IconButton
                    icon="pencilSquare"
                    iconSize="sm"
                    variant="text"
                    disabled={!isVerified}
                    style={{
                      height: 'fit-content',
                      width: 'fit-content',
                      padding: '5px',
                      marginLeft: '5px',
                      border: `1px solid ${theme.palette.text.primary}`,
                    }}
                  />
                </Box>
              </Box>
              {category.comments && (
                <Typography variant="body2" color={categoryTextColor}>
                  {category.comments}
                </Typography>
              )}
            </Box>
          </Card>
        </SwipeableListItem>
      </SwipeableList>
      <ItemMenu
        itemId={category._id}
        handleRemove={handleRemove}
        contextMenuCoordinates={contextMenuCoordinates}
        handleCloseMenu={handleCloseMenu}
        handleEdit={handleEdit}
        setIsShareWithModalOpen={setIsShareWithModalOpen}
      />
      <ShareWithModal
        categoryIds={[category._id]}
        isOpen={isShareWithModalOpen}
        onClose={() => setIsShareWithModalOpen(false)}
      />
    </Grid>
  );
};

export default CategoryCard;
