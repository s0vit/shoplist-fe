import { alpha, Box, Card, CardContent, Grid, Stack, Typography, useTheme } from '@mui/material';
import { deletePaymentSource, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { Delete, Edit } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import handleError from 'src/utils/errorHandler.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';

type TPaymentSourcesCardProps = {
  paymentSource: TPaymentSource;
  refetchPaymentSources: () => void;
};

const PaymentSourcesCard = ({ paymentSource, refetchPaymentSources }: TPaymentSourcesCardProps) => {
  const setCurrentEditingPaymentSource = usePaymentSourcesStore.use.setCurrentEditingPaymentSource();
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

  const theme = useTheme();
  const paymentSourceTextColor = theme.palette.text.primary;
  const paymentSourceBackgroundColor = alpha(paymentSource.color || theme.palette.primary.main, 0.05);

  const { mutate: requestDeletePaymentSource } = useMutation({
    mutationFn: deletePaymentSource,
    onError: handleError,
    onSuccess: refetchPaymentSources,
  });

  const handleEdit = () => {
    setCurrentEditingPaymentSource(paymentSource);
    setIsPaymentSourceModalOpen(true);
  };

  const handleRemove = () => {
    requestDeletePaymentSource(paymentSource._id);
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleEdit}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height="100%"
          sx={{
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
          }}
        >
          <Edit />
        </Stack>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleRemove}>
        <Stack
          alignItems="center"
          height="100%"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
          }}
        >
          <Delete />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Grid item xs={12}>
      <SwipeableList type={Type.IOS} fullSwipe style={{ height: 'auto' }}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Card
            sx={{
              backgroundColor: paymentSourceBackgroundColor,
              width: '100%',
              borderRadius: theme.spacing(1),
              border: `1px solid ${paymentSource.color || theme.palette.primary.main}`,
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" component="div" color={paymentSourceTextColor}>
                  {paymentSource.title}
                </Typography>
                <Typography variant="body2" color={paymentSourceTextColor}>
                  Created: {new Date(paymentSource.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              {paymentSource.comments && (
                <Typography variant="body2" color={paymentSourceTextColor}>
                  {paymentSource.comments}
                </Typography>
              )}
            </CardContent>
          </Card>
        </SwipeableListItem>
      </SwipeableList>
    </Grid>
  );
};

export default PaymentSourcesCard;
