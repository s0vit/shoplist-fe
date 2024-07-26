import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext } from 'src/app/providers/Theme.tsx';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useLoadConfigs from 'src/entities/userSettings/hooks/useLoadConfig';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import DrawerNavigation from 'src/widgets/Drawer/DrawerNavigation';
import NavBarMenu from 'src/widgets/NavBarMenu/NavBarMenu.tsx';

const Navbar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const isVerified = useUserStore.use.user?.()?.isVerified;
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();

  useLoadExpenses({ shouldFetchOnLoad: isVerified });
  useLoadCategories(isVerified);
  useLoadPaymentSources(isVerified);
  useLoadConfigs();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {isLoggedIn && <NavBarMenu />}
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerNavigation isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
};

export default Navbar;
