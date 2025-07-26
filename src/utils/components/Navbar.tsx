import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material';
import { Box, Typography } from 'src/shared/ui-kit';

import { useContext, useState } from 'react';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import useLoadConfigs from 'src/entities/userSettings/hooks/useLoadConfig';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import DrawerNavigation from 'src/widgets/Drawer/DrawerNavigation';
import NavBarMenu from 'src/widgets/NavBarMenu/NavBarMenu.tsx';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from 'src/app/providers/Theme.tsx';

const Navbar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const isVerified = useUserStore.use.user?.()?.isVerified;
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();
  const { t } = useTranslation('translation');

  useLoadExpenses({ shouldFetchOnLoad: isVerified });
  useLoadCategories(isVerified);
  useLoadPaymentSources(isVerified);
  useLoadConfigs();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Extract valid CSS properties from theme.mixins.toolbar
  const toolbarStyles = theme.mixins.toolbar;
  const validToolbarStyles = {
    minHeight: toolbarStyles?.minHeight,
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, ...validToolbarStyles }}>
        <AppBar position="fixed">
          <Toolbar>
            {isDesktopWidth && (
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h3" style={{ flexGrow: 1 }}>
              {t('Shoplist')} {`${import.meta.env.PACKAGE_VERSION}`}
            </Typography>
            <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
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
