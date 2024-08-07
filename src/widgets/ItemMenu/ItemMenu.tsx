import { Delete, Edit, Share } from '@mui/icons-material';
import { alpha, Menu, MenuItem, Typography, useTheme } from '@mui/material';

type TItemMenuProps = {
  contextMenuCoordinates: { mouseX: number; mouseY: number } | null;
  handleCloseMenu: () => void;
  handleEdit: () => void;
  handleRemove: (id: string) => void;
  itemId: string;
  setIsShareWithModalOpen: (isOpen: boolean) => void;
};

const ItemMenu = ({
  contextMenuCoordinates,
  handleCloseMenu,
  handleEdit,
  handleRemove,
  itemId,
  setIsShareWithModalOpen,
}: TItemMenuProps) => {
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
          handleRemove(itemId);
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

export default ItemMenu;
