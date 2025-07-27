import { Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Avatar, IconButton, Icon } from 'src/shared/ui-kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import useLogout from 'src/utils/hooks/useLogout.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { useTranslation } from 'react-i18next';

const NavBarMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  const userData = _useUserStore.use.user?.();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useStableCallback((event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  });

  const handleClose = useStableCallback(() => {
    setAnchorEl(null);
  });

  const { handleLogout } = useLogout();

  const handleLoginClick = useStableCallback(() => {
    handleLogout();
  });

  return (
    <>
      <Tooltip title={t('Account settings')}>
        <IconButton onClick={handleClick}>
          <Avatar src={userData?.avatar} name={userData?.login || userData?.email} style={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
      <Menu
        key={location.pathname}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: { mt: 0 } } }}
      >
        <MenuItem onClick={() => navigate(RoutesEnum.PROFILE)}>
          <ListItemIcon>
            <Icon name="user" size="sm" />
          </ListItemIcon>
          {t('Profile')}
        </MenuItem>
        <MenuItem disabled={!userData?.isVerified} onClick={() => navigate(RoutesEnum.ACCESS_CONTROL)}>
          <ListItemIcon>
            <Icon name="share" size="sm" />
          </ListItemIcon>
          {t('Shared')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLoginClick}>
          <ListItemIcon>
            <Icon name="logout" size="sm" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBarMenu;
