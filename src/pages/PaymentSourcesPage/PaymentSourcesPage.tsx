import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Box, Divider, Paper, Typography } from '@mui/material';
import PaymentSourcesGrid from 'src/entities/paymentSource/ui/PaymentSourcesGrid.tsx';
import { useTranslation } from 'react-i18next';

const PaymentSourcesPage = () => {
  const { userPaymentSources, isPaymentSourcesLoading, fetchPaymentSources } = useLoadPaymentSources();
  const { t } = useTranslation('accounts');

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h3">{t('Accounts')}</Typography>
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
