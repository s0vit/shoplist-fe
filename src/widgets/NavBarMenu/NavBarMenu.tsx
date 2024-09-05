import { Logout, Person, ShareSharp } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
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

  const handleClick = useStableCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small">
          <Avatar src={userData?.avatar} sx={{ width: 32, height: 32 }}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: { sx: { mt: 0 } } }}
      >
        <MenuItem onClick={() => navigate(RoutesEnum.PROFILE)}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          {t('Profile')}
        </MenuItem>
        <MenuItem onClick={() => navigate(RoutesEnum.ACCESS_CONTROL)}>
          <ListItemIcon>
            <ShareSharp fontSize="small" />
          </ListItemIcon>
          {t('Shared')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLoginClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBarMenu;
