import { Delete, Edit, Share } from '@mui/icons-material';
import { alpha, Menu, MenuItem, Typography, useTheme } from '@mui/material';

type TExpenseItemMenuProps = {
  contextMenuCoordinates: { mouseX: number; mouseY: number } | null;
  handleCloseMenu: () => void;
  handleEdit: () => void;
  handleRemove: (id: string) => void;
  expense: { _id: string };
  setIsShareWithModalOpen: (isOpen: boolean) => void;
};

const ExpenseItemMenu = ({
  contextMenuCoordinates,
  handleCloseMenu,
  handleEdit,
  handleRemove,
  expense,
  setIsShareWithModalOpen,
}: TExpenseItemMenuProps) => {
  const theme = useTheme();

  return (
    <Menu
      variant="selectedMenu"
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenuCoordinates ? { top: contextMenuCoordinates.mouseY, left: contextMenuCoordinates.mouseX } : undefined
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={!!contextMenuCoordinates}
      onClose={handleCloseMenu}
      slotProps={{
        paper: {
          style: {
            width: '200px',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          handleEdit();
          handleCloseMenu();
        }}
      >
        <Edit fontSize="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Edit
        </Typography>
      </MenuItem>
      <MenuItem
        divider
        onClick={() => {
          setIsShareWithModalOpen(true);
          handleCloseMenu();
        }}
      >
        <Share fontSize="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Share with
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleRemove(expense._id);
          handleCloseMenu();
        }}
      >
        <Delete fontSize="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Delete
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default ExpenseItemMenu;
