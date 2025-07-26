import { AddCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from 'src/shared/ui-kit';

import HorizontalListItem from 'src/widgets/HorizontalList/HorizontalListItem.tsx';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import DeleteCategoryDialog from 'src/widgets/Modal/DeleteCategoryDialog.tsx';
import { useState } from 'react';

type TItem = { _id: string; title: string; color?: string };

type THorizontalListProps = {
  items: TItem[];
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (item: TItem) => void;
  handleShare: (id: string) => void;
};

const HorizontalList = ({
  items,
  disabled,
  selectedItem,
  setSelectedItem,
  openModal,
  handleDelete,
  handleShare,
  handleEdit,
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

  return (
    <Box sx={{ paddingTop: 8, paddingBottom: 4 }} style={{ overflowX: 'auto', display: 'flex' }}>
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
  );
};

export default HorizontalList;
