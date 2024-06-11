import { alpha, Card, CardContent, Grid, Typography } from '@mui/material';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';

type TPaymentSourcesCardProps = {
  paymentSource: TPaymentSource;
};

const PaymentSourcesCard = ({ paymentSource }: TPaymentSourcesCardProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={paymentSource._id}>
      <Card style={{ backgroundColor: alpha(paymentSource.color || 'fff', 0.8) }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {paymentSource.title}
          </Typography>
          {paymentSource.comments && (
            <Typography variant="body2" color="textSecondary">
              {paymentSource.comments}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary">
            Created: {new Date(paymentSource.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PaymentSourcesCard;
