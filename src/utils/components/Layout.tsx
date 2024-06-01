import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { ContentContainer } from 'src/utils/components/ContentContainer.tsx';
import { Navbar } from 'src/entities/user/ui/Navbar.tsx';

const Layout = () => {
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
