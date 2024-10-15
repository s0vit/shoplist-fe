import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import PaymentSourcesGrid from 'src/entities/paymentSource/ui/PaymentSourcesGrid.tsx';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';

const PaymentSourcesPage = () => {
  const { userPaymentSources, isPaymentSourcesLoading, fetchPaymentSources } = useLoadPaymentSources();
  const { t } = useTranslation('accounts');
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

  return (
    <Paper>
      <Box padding={2} style={{ position: 'relative' }}>
        <Typography variant="h3">{t('Accounts')}</Typography>
        <IconButton
          size="small"
          disabled={false}
          color="primary"
          onClick={() => {
            setIsPaymentSourceModalOpen(true);
          }}
          style={{ position: 'absolute', right: '20px', top: '26px' }}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Divider />
        <br />
        {isPaymentSourcesLoading && <Typography>Loading...</Typography>}
        {userPaymentSources && (
          <PaymentSourcesGrid paymentSources={userPaymentSources} refetchPaymentSources={fetchPaymentSources} />
        )}
      </Box>
    </Paper>
  );
};

export default PaymentSourcesPage;
