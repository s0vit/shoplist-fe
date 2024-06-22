import { alpha, Button, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import useLongPress from 'src/utils/hooks/useLongPress.ts';
import { Delete, Edit, Share } from '@mui/icons-material';
import { Fragment, MouseEvent, TouchEvent, useState } from 'react';

type THorizontalListItemProps = {
  item: { _id: string; title: string; color?: string };
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (item: { _id: string; title: string; color?: string }) => void;
  handleShare: (id: string) => void;
};

const HorizontalListItem = ({
  item,
  handleDelete,
  handleShare,
  selectedItem,
  setSelectedItem,
  handleEdit,
  disabled,
}: THorizontalListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const theme = useTheme();

  const handleOpenMenu = (event: MouseEvent<HTMLElement> | TouchEvent, itemId: string) => {
    event.preventDefault();
    setAnchorEl(event.target as HTMLElement);
    setSelectedItemId(itemId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment key={item._id}>
      <Button
        onContextMenu={(e) => handleOpenMenu(e, item._id)}
        {...useLongPress((e) => handleOpenMenu(e, item._id), 500)}
        size="small"
        disabled={disabled}
        variant={selectedItem === item._id ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setSelectedItem(selectedItem === item._id ? '' : item._id)}
        sx={
          selectedItem === item._id
            ? {
                backgroundColor: `${alpha(item.color || '', 0.7)}!important`,
                color: `${theme.palette.getContrastText(item.color || '')}!important`,
              }
            : { borderColor: `${item.color}!important`, color: theme.palette.text.secondary }
        }
        style={{ marginRight: '8px', flexShrink: 0 }}
      >
        {item.title}
      </Button>
      <Menu
        variant="selectedMenu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl) && item._id === selectedItemId}
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
            handleEdit(item);
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
            handleShare(item._id);
          }}
        >
          <Share fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Share with
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(item._id);
          }}
        >
          <Delete fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default HorizontalListItem;
