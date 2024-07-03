import { Grid } from '@mui/material';
import PaymentSourcesCard from 'src/entities/paymentSource/ui/PaymentSourcesCard.tsx';
import { deletePaymentSource, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { useMutation } from '@tanstack/react-query';
import handleError from 'src/utils/errorHandler.ts';

type TPaymentSourcesProps = {
  paymentSources: TPaymentSource[];
  refetchPaymentSources: () => void;
};

const PaymentSources = ({ paymentSources, refetchPaymentSources }: TPaymentSourcesProps) => {
  const { mutate: requestDeletePaymentSource } = useMutation({
    mutationFn: deletePaymentSource,
    onError: handleError,
    onSuccess: refetchPaymentSources,
  });

  return (
    <Grid container spacing={2}>
      {paymentSources.map((paymentSource) => (
        <PaymentSourcesCard
          key={paymentSource._id}
          paymentSource={paymentSource}
          handleRemove={() => requestDeletePaymentSource(paymentSource._id)}
        />
      ))}
    </Grid>
  );
};

export default PaymentSources;
