import {
  ListItemIcon,
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import React, { useContext, useState } from 'react';
import { ColorModeContext } from 'src/app/providers/Theme.tsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import DrawerNavigation from 'src/widgets/Navigaton/DrawerNavigation/DrawerNavigation.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import useLogout from 'src/utils/hooks/useLogout.ts';
import { Logout } from '@mui/icons-material';

const Navbar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const isVerified = useUserStore.use.user?.()?.isVerified;
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();

  //все для кнопки меню
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useLoadExpenses({ shouldFetchOnLoad: isVerified });
  useLoadCategories(isVerified);
  useLoadPaymentSources(isVerified);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { handleLogout } = useLogout();

  const handleLoginClick = () => {
    isLoggedIn ? handleLogout() : navigate(RoutesEnum.LOGIN);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, ...theme.mixins.toolbar }}>
        <AppBar position="fixed">
          <Toolbar>
            {isDesktopWidth && (
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Shoplist {`${import.meta.env.PACKAGE_VERSION}`}
            </Typography>

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
                <MenuItem onClick={handleClose}>
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
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerNavigation isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
};

export default Navbar;
