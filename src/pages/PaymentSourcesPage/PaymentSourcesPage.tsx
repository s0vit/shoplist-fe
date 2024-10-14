import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Box, Divider, Paper, Typography } from '@mui/material';
import PaymentSourcesGrid from 'src/entities/paymentSource/ui/PaymentSourcesGrid.tsx';
import { useTranslation } from 'react-i18next';
import DeleteCategoryDialog from 'src/widgets/Modal/DeleteCategoryDialog.tsx';
import { useState } from 'react';
import { deletePaymentSource, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { useMutation } from '@tanstack/react-query';
import handleError from 'src/utils/errorHandler';

const PaymentSourcesPage = () => {
  const { userPaymentSources, isPaymentSourcesLoading, fetchPaymentSources } = useLoadPaymentSources();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingPaymentSource, setDeletingPaymentSource] = useState<TPaymentSource>({} as TPaymentSource);
  const { t } = useTranslation('accounts');

  const handleOpenDeleteDialog = (paymentSource: TPaymentSource) => {
    setOpenDeleteDialog(true);
    setDeletingPaymentSource(paymentSource);
  };

  const { mutate: requestDeletePaymentSource, isPending: isUpdating } = useMutation({
    mutationFn: deletePaymentSource,
    onError: (error) => handleError(error),
    onSuccess: async () => {
      await fetchPaymentSources();
      setOpenDeleteDialog(false);
      setDeletingPaymentSource({} as TPaymentSource);
    },
  });

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h3">{t('Accounts')}</Typography>
        <Divider />
        <br />
        {isPaymentSourcesLoading && <Typography>Loading...</Typography>}
        {userPaymentSources && (
          <PaymentSourcesGrid paymentSources={userPaymentSources} handleOpenDeleteDialog={handleOpenDeleteDialog} />
        )}
        <DeleteCategoryDialog<TPaymentSource>
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          handleConfirmDelete={requestDeletePaymentSource}
          item={deletingPaymentSource}
          isUpdating={isUpdating}
        />
      </Box>
    </Paper>
  );
};

export default PaymentSourcesPage;
