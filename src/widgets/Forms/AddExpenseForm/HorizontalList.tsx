import { AddCircle } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import HorizontalListItem from 'src/widgets/Forms/AddExpenseForm/HorizontalListItem.tsx';

type THorizontalListProps = {
  items: { _id: string; title: string; color?: string }[];
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (item: { _id: string; title: string; color?: string }) => void;
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
  return (
    <Box pt={1} pb={0.5} sx={{ overflowX: 'auto', display: 'flex' }}>
      {items.map((item) => {
        return (
          <HorizontalListItem
            key={item._id}
            disabled={disabled}
            item={item}
            handleEdit={handleEdit}
            handleShare={handleShare}
            handleDelete={handleDelete}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        );
      })}
      <IconButton size="small" disabled={disabled} color="primary" onClick={openModal}>
        <AddCircle />
      </IconButton>
    </Box>
  );
};

export default HorizontalList;
