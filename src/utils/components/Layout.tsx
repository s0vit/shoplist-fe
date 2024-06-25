import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import ContentContainer from 'src/utils/components/ContentContainer.tsx';
import Navbar from 'src/utils/components/Navbar.tsx';
import { useEffect } from 'react';
import FootBar from 'src/utils/components/FootBar.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';

const Layout = () => {
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <Box>
      <Navbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      {!isDesktopWidth && <FootBar />}
    </Box>
  );
};

export default Layout;
