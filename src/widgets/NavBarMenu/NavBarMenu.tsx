import React from 'react';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import useLogout from 'src/utils/hooks/useLogout.ts';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import { useNavigate } from 'react-router-dom';

const NavBarMenu = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleLogout } = useLogout();

  const handleLoginClick = () => {
    isLoggedIn ? handleLogout() : navigate(RoutesEnum.LOGIN);
  };

  return (
    <>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              navigate('/profile');
            }}
          >
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLoginClick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {isLoggedIn ? 'Logout' : 'Login'}
          </MenuItem>
        </Menu>
      </>
    </>
  );
};

export default NavBarMenu;
