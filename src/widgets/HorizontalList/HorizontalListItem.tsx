import { Menu, MenuItem } from 'src/shared/ui-kit';
import { Button } from 'src/shared/ui-kit';
import { Typography, Icon } from 'src/shared/ui-kit';

import { Fragment, MouseEvent, TouchEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import styles from './HorizontalListItem.module.scss';

type TItem = { _id: string; title: string; color?: string };

type THorizontalListItemProps = {
  item: TItem;
  disabled: boolean;
  selectedItem: string;
  setSelectedItem: (id: string) => void;
  handleOpenDeleteDialog: (item: TItem) => void;
  handleEdit: (item: { _id: string; title: string; color?: string }) => void;
  handleShare: (id: string) => void;
};

const HorizontalListItem = ({
  item,
  handleOpenDeleteDialog,
  handleShare,
  selectedItem,
  setSelectedItem: _setSelectedItem,
  handleEdit,
  disabled,
}: THorizontalListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const { t } = useTranslation(['homePage', 'translation'], { nsMode: 'fallback' });

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
        onClick={() => _setSelectedItem(item._id)}
        onContextMenu={(e: React.MouseEvent<HTMLElement> | React.TouchEvent) => handleOpenMenu(e, item._id)}
        disabled={disabled}
        variant={selectedItem === item._id ? 'contained' : 'outlined'}
        size="small"
        width="auto"
        style={
          selectedItem === item._id
            ? {
                backgroundColor: disabled ? 'var(--color-icon-disabled)' : item.color || 'var(--color-primary)',
                color: 'var(--color-white)',
              }
            : {
                borderColor: disabled ? 'var(--color-icon-disabled)' : item.color || 'var(--color-primary)',
                color: 'var(--color-text-secondary)',
              }
        }
        className={styles.item}
        label={item.title}
      />
      <Menu
        variant="selectedMenu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl) && item._id === selectedItemId && !!isVerified}
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
        <MenuItem onClick={() => handleEdit(item)}>
          <Icon name="pencilSquare" size="sm" />
          <Typography variant="body2" style={{ marginLeft: 8 }}>
            {t('Edit')}
          </Typography>
        </MenuItem>
        <MenuItem divider onClick={() => handleShare(item._id)}>
          <Icon name="share" size="sm" />
          <Typography variant="body2" style={{ marginLeft: 8 }}>
            {t('Share with')}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleOpenDeleteDialog(item)}>
          <Icon name="trash" size="sm" />
          <Typography variant="body2" style={{ marginLeft: 8 }}>
            {t('Delete')}
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default HorizontalListItem;
