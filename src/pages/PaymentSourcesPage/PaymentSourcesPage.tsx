import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Divider, IconButton, Paper, Typography } from '@mui/material';
import { Box } from 'src/shared/ui-kit';

import PaymentSourcesGrid from 'src/entities/paymentSource/ui/PaymentSourcesGrid.tsx';
import { useTranslation } from 'react-i18next';
import DeleteCategoryDialog from 'src/widgets/Modal/DeleteCategoryDialog.tsx';
import { useEffect, useState } from 'react';
import { deletePaymentSource, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { useMutation } from '@tanstack/react-query';
import handleError from 'src/utils/errorHandler';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import useUpdateSinglePaymentSourceOrder from 'src/entities/paymentSource/hooks/useUpdatePaymentSourcesOrder.ts';
import styles from './PaymentSourcesPage.module.scss';

const PaymentSourcesPage = () => {
  const { userPaymentSources, isPaymentSourcesLoading, fetchPaymentSources } = useLoadPaymentSources();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingPaymentSource, setDeletingPaymentSource] = useState<TPaymentSource>();
  const [displayPaymentSources, setDisplayPaymentSources] = useState<TPaymentSource[]>([]);
  const { t } = useTranslation('accounts');
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

  const handleOpenDeleteDialog = (paymentSource: TPaymentSource) => {
    setOpenDeleteDialog(true);
    setDeletingPaymentSource(paymentSource);
  };

  useEffect(() => {
    if (userPaymentSources) {
      setDisplayPaymentSources(userPaymentSources);
    }
  }, [userPaymentSources]);

  const { mutate: updateOrder } = useUpdateSinglePaymentSourceOrder();

  const handleReorder = (reorderedSources: TPaymentSource[], movedId: string, newIndex: number) => {
    setDisplayPaymentSources(reorderedSources);
    updateOrder({ id: movedId, newIndex });
  };

  const { mutate: requestDeletePaymentSource, isPending: isUpdating } = useMutation({
    mutationFn: deletePaymentSource,
    onError: (error) => handleError(error),
    onSuccess: async () => {
      await fetchPaymentSources();
      setOpenDeleteDialog(false);
      setDeletingPaymentSource(undefined);
    },
  });

  return (
    <Paper>
      <Box className={styles.rootBox}>
        <Typography variant="h3">{t('Accounts')}</Typography>
        <IconButton
          size="small"
          disabled={false}
          color="primary"
          onClick={() => {
            setIsPaymentSourceModalOpen(true);
          }}
          className={styles.addButton}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Divider />
        <br />
        {isPaymentSourcesLoading && <Typography>Loading...</Typography>}
        {userPaymentSources && (
          <PaymentSourcesGrid
            paymentSources={displayPaymentSources}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
            onReorder={handleReorder}
          />
        )}
        <DeleteCategoryDialog
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
