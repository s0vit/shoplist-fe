import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Box, Divider, Paper, Typography } from '@mui/material';
import PaymentSourcesGrid from 'src/entities/paymentSource/ui/PaymentSourcesGrid.tsx';
import UpsertPaymentSourceModal from 'src/entities/paymentSource/ui/UpsertPaymentSourceModal.tsx';

const PaymentSourcesPage = () => {
  const { userPaymentSources, isPaymentSourcesLoading, fetchPaymentSources } = useLoadPaymentSources();

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h3">Accounts</Typography>
        <Divider />
        <br />
        {isPaymentSourcesLoading && <Typography>Loading...</Typography>}
        {userPaymentSources && (
          <PaymentSourcesGrid paymentSources={userPaymentSources} refetchPaymentSources={fetchPaymentSources} />
        )}
      </Box>
      <UpsertPaymentSourceModal />
    </Paper>
  );
};

export default PaymentSourcesPage;
