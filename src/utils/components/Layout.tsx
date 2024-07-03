import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import ContentContainer from 'src/utils/components/ContentContainer.tsx';
import Navbar from 'src/utils/components/Navbar.tsx';
import { useEffect } from 'react';
import FootBar from 'src/utils/components/FootBar.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal/ExpenseModal.tsx';
import UpsertCategoryModal from 'src/entities/category/ui/UpsertCategoryModal.tsx';
import UpsertPaymentSourceModal from 'src/entities/paymentSource/ui/UpsertPaymentSourceModal.tsx';

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
      {/*modals that are called from different pages*/}
      <ExpenseModal />
      <UpsertPaymentSourceModal />
      <UpsertCategoryModal />
      {!isDesktopWidth && <FootBar />}
    </Box>
  );
};

export default Layout;
