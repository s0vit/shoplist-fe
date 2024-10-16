import { Grid } from '@mui/material';
import PaymentSourcesCard from 'src/entities/paymentSource/ui/PaymentSourcesCard.tsx';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';

type TPaymentSourcesProps = {
  paymentSources: TPaymentSource[];
  handleOpenDeleteDialog: (paymentSource: TPaymentSource) => void;
};

const PaymentSources = ({ paymentSources, handleOpenDeleteDialog }: TPaymentSourcesProps) => {
  return (
    <Grid container spacing={2}>
      {paymentSources.map((paymentSource) => (
        <PaymentSourcesCard
          key={paymentSource._id}
          paymentSource={paymentSource}
          handleRemove={() => handleOpenDeleteDialog(paymentSource)}
        />
      ))}
    </Grid>
  );
};

export default PaymentSources;
