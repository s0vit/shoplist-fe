import { Tooltip } from '@mui/material';
import { Menu, MenuItem, ListItemIcon as MenuListItemIcon } from 'src/shared/ui-kit';
import { Divider } from 'src/shared/ui-kit';
import { Avatar, IconButton, Icon } from 'src/shared/ui-kit';

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import useLogout from 'src/utils/hooks/useLogout.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { useTranslation } from 'react-i18next';

const NavBarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={() => navigate(RoutesEnum.PROFILE)}>
          <MenuListItemIcon>
            <Icon name="user" size="sm" />
          </MenuListItemIcon>
          {t('Profile')}
        </MenuItem>
        <MenuItem disabled={!userData?.isVerified} onClick={() => navigate(RoutesEnum.ACCESS_CONTROL)}>
          <MenuListItemIcon>
            <Icon name="share" size="sm" />
          </MenuListItemIcon>
          {t('Shared')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLoginClick}>
          <MenuListItemIcon>
            <Icon name="logout" size="sm" />
          </MenuListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBarMenu;
