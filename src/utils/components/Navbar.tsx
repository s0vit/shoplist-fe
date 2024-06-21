import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMutation } from '@tanstack/react-query';
import { logout } from 'src/shared/api/authApi.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';
import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from 'src/app/providers/Theme.tsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import DrawerNavigation from 'src/widgets/Navigaton/DrawerNavigation/DrawerNavigation.tsx';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';

const Navbar = () => {
  const isLoggedIn = useUserStore(selectUserData)?.accessToken;
  const setUserData = useUserStore((state) => state.setUser);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useLoadExpenses({ shouldFetchOnLoad: true });
  useLoadCategories(true);
  useLoadPaymentSources(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { isSuccess, mutate: requestLogout } = useMutation<void, TErrorResponse>({
    mutationFn: logout,
  });

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserData();
    }
  }, [isSuccess, setUserData]);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      requestLogout();

      return;
    }

    navigate(RoutesEnum.LOGIN);
  };

  const onIconButtonHandler = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={onIconButtonHandler}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Shoplist
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
