import { AppBar, Toolbar } from 'src/shared/ui-kit';
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
import { ColorModeContext } from 'src/app/providers/Theme.tsx';
import useNotificationsStore from 'src/entities/notifications/model/store/useNotificationsStore.ts';
import { AlertIcon } from 'src/assets/icons/Icons.tsx';

const Navbar = () => {
  const isLoggedIn = useUserStore.use.user?.() !== undefined;
  const isVerified = useUserStore.use.user?.()?.isVerified;
  const colorMode = useContext(ColorModeContext);
  const { isDesktopWidth, isMobileWidth, isTabletWidth } = useWindowWidth();
  const toggleIsModalOpen = useNotificationsStore.use.toggleIsModalOpen();

  useLoadExpenses({ shouldFetchOnLoad: isVerified });
  useLoadCategories(isVerified);
  useLoadPaymentSources(isVerified);
  useLoadConfigs();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const username = useUserStore.use.user?.()?.email;
  const devVersion = import.meta.env.PACKAGE_VERSION;

  const truncate = (str: string | undefined) => {
    if (!str) return '';

    return str.length > 5 ? str.slice(0, 5) + '...' : str;
  };

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
            {(isMobileWidth || isTabletWidth) && isLoggedIn && (
              <>
                <NavBarMenu />
                <Typography variant="h3" style={{ flexGrow: 1 }}>
                  {truncate(username)} {import.meta.env.DEV && devVersion}
                </Typography>
              </>
            )}
            <IconButton icon="moon" variant="text" onClick={colorMode.toggleColorMode} style={{ marginLeft: 'auto' }} />
            {!isVerified && <AlertIcon onClick={toggleIsModalOpen} style={{ cursor: 'pointer' }} />}
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerNavigation isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
};

export default Navbar;
