import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import { useContext, useState } from 'react';
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

const Navbar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const isVerified = useUserStore.use.user?.()?.isVerified;
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();

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
            <Button color="inherit" onClick={handleLoginClick}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
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
