import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import ContentContainer from 'src/utils/components/ContentContainer.tsx';
import Navbar from 'src/utils/components/Navbar.tsx';
import { useEffect } from 'react';

const Layout = () => {
  const theme = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <Box>
      <Navbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Box>
  );
};

export default Layout;
