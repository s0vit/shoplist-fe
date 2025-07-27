import { AppBar, Toolbar } from '@mui/material';
import { Box, Typography, IconButton } from 'src/shared/ui-kit';

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
  const { isDesktopWidth } = useWindowWidth();
  const { t } = useTranslation('translation');

  useLoadExpenses({ shouldFetchOnLoad: isVerified });
  useLoadCategories(isVerified);
  useLoadPaymentSources(isVerified);
  useLoadConfigs();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Default toolbar styles
  const validToolbarStyles = {
    minHeight: '64px',
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, ...validToolbarStyles }}>
        <AppBar position="fixed">
          <Toolbar>
            {isDesktopWidth && (
              <IconButton
                icon="menu"
                iconSize="lg"
                variant="text"
                style={{ marginRight: 16 }}
                onClick={() => setIsDrawerOpen(true)}
              />
            )}
            <Typography variant="h3" style={{ flexGrow: 1 }}>
              {t('Shoplist')} {`${import.meta.env.PACKAGE_VERSION}`}
            </Typography>
            <IconButton icon="moon" variant="text" onClick={colorMode.toggleColorMode} />
            {isLoggedIn && <NavBarMenu />}
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerNavigation isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
};

export default Navbar;
