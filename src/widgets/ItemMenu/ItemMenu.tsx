import { Menu, MenuItem } from 'src/shared/ui-kit';
import { Typography, Icon } from 'src/shared/ui-kit';

import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';

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
  const { t } = useTranslation('translation');
  const isVerified = _useUserStore.use.user?.()?.isVerified;

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
      open={!!contextMenuCoordinates && !!isVerified}
      onClose={handleCloseMenu}
      slotProps={{
        paper: {
          style: {
            width: '200px',
            border: '1px solid var(--color-border)',
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
        <Icon name="pencilSquare" size="sm" />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {t('Edit')}
        </Typography>
      </MenuItem>
      <MenuItem
        divider
        onClick={() => {
          setIsShareWithModalOpen(true);
          handleCloseMenu();
        }}
      >
        <Icon name="share" size="sm" />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {t('Share with')}
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleRemove(itemId);
          handleCloseMenu();
        }}
      >
        <Icon name="trash" size="sm" />
        <Typography variant="body2" style={{ marginLeft: 8 }}>
          {t('Delete')}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default ItemMenu;
