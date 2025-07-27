import { alpha, Menu, MenuItem, useTheme } from '@mui/material';
import { Typography, Icon } from 'src/shared/ui-kit';

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('translation');

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
      <MenuItem onClick={handleEdit}>
        <Icon name="pencilSquare" size="sm" />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {t('Edit')}
        </Typography>
      </MenuItem>
      <MenuItem divider onClick={() => setIsShareWithModalOpen(true)}>
        <Icon name="share" size="sm" />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {t('Share with')}
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleRemove(expense._id)}>
        <Icon name="trash" size="sm" />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {t('Delete')}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default ExpenseItemMenu;
