import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ContentContainer from 'src/utils/components/ContentContainer.tsx';
import FootBar from 'src/utils/components/FootBar.tsx';
import Navbar from 'src/utils/components/Navbar.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal';
import UpsertCategoryModal from 'src/widgets/Modal/UpsertCategoryModal';
import UpsertPaymentSourceModal from 'src/widgets/Modal/UpsertPaymentSourceModal';
import { UnverifiedAlert } from 'src/utils/components/UnverifiedAlert.tsx';

const Layout = () => {
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <Box>
      <Navbar />
      <UnverifiedAlert />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <ExpenseModal />
      <UpsertPaymentSourceModal />
      <UpsertCategoryModal />
      {!isDesktopWidth && <FootBar />}
    </Box>
  );
};

export default Layout;
