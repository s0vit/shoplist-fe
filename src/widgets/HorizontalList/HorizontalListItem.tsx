import { useContrastColor, Menu, MenuItem } from 'src/shared/ui-kit';
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
  setSelectedItem,
  handleEdit,
  disabled,
}: THorizontalListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const { t } = useTranslation(['homePage', 'translation'], { nsMode: 'fallback' });

  const handleOpenMenu = (event: MouseEvent<HTMLElement> | TouchEvent) => {
    event.preventDefault();
    setAnchorEl(event.target as HTMLElement);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isSelected = selectedItem === item._id;
  const normalBackgroundColor = isSelected ? item.color || 'var(--color-primary)' : 'var(--color-card-bg)';
  const disabledBackgroundColor = disabled ? 'var(--color-icon-disabled)' : normalBackgroundColor;
  const backgroundColor = disabled ? disabledBackgroundColor : normalBackgroundColor;
  const color = useContrastColor(backgroundColor);

  return (
    <Fragment key={item._id}>
      <Button
        onClick={() => setSelectedItem(item._id)}
        onContextMenu={handleOpenMenu}
        disabled={disabled}
        variant={isSelected ? 'contained' : 'outlined'}
        size="small"
        width="auto"
        style={{
          backgroundColor,
          color,
          borderColor: item.color || 'var(--color-primary)',
        }}
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
        open={Boolean(anchorEl) && isSelected && !!isVerified}
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
