import { AddCircle } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import HorizontalListItem from 'src/widgets/HorizontalList/HorizontalListItem.tsx';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import DeleteCategoryDialog from 'src/widgets/Modal/DeleteCategoryDialog.tsx';
import { useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import SortableList from 'react-easy-sort';

export type TItem = {
  _id: string;
  title: string;
  color?: string;
  order: number;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
};

type THorizontalListProps = {
  items: TItem[];
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (item: TItem) => void;
  handleShare: (id: string) => void;
  updateOrder: (data: { _id: string; order: number }) => void;
  setItems: (items: TItem[]) => void;
};

const HorizontalList = ({
  items,
  setItems,
  disabled,
  selectedItem,
  setSelectedItem,
  openModal,
  handleDelete,
  handleShare,
  handleEdit,
  updateOrder,
}: THorizontalListProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingItem, setDeletingItem] = useState<TItem>();

  const handleOpenDeleteDialog = (item: TItem) => {
    setOpenDeleteDialog(true);
    setDeletingItem(item);
  };

  const handleConfirmDelete = (itemId: string) => {
    handleDelete(itemId);
    setOpenDeleteDialog(false);
    setDeletingItem(undefined);
  };

  const isVerified = _useUserStore.use.user?.()?.isVerified;

  const handleSortEnd = async (oldIndex: number, newIndex: number) => {
    const newItems = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(newItems);

    try {
      await Promise.all(newItems.map((item, index) => updateOrder({ _id: item._id, order: index })));
    } catch (error) {
      console.error('Ошибка при обновлении порядка:', error);
    }
  };

  return (
    <SortableList onSortEnd={handleSortEnd} draggedItemClassName="dragged-item" lockAxis="x">
      <Box pt={1} pb={0.5} sx={{ overflowX: 'auto', display: 'flex' }}>
        {items.map((item) => {
          return (
            <HorizontalListItem
              key={item._id}
              disabled={disabled}
              item={item}
              handleEdit={handleEdit}
              handleShare={handleShare}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          );
        })}
        <IconButton size="small" disabled={disabled || !isVerified} color="primary" onClick={openModal}>
          <AddCircle />
        </IconButton>
        <DeleteCategoryDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          handleConfirmDelete={handleConfirmDelete}
          item={deletingItem}
          isUpdating={disabled}
        />
      </Box>
    </SortableList>
  );
};

export default HorizontalList;
