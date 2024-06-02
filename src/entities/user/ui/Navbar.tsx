import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMutation } from '@tanstack/react-query';
import { logout } from 'src/shared/api/authApi.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ColorModeContext } from 'src/app/providers/Theme.tsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const Navbar = () => {
  const isLoggedIn = useUserStore(selectUserData)?.accessToken;
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const { isSuccess, mutate } = useMutation({
    mutationFn: () => logout(),
  });

  const handleLoginClick = () => {
    if (isLoggedIn) {
      mutate();
      return;
    }
    console.log('login click logic goes here');
  };

  useEffect(() => {
    if (isSuccess) {
      toast('Logged out', { type: 'success' });
    }
  }, [isSuccess]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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
  );
};
