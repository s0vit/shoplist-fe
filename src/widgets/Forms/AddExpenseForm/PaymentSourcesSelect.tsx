import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getPaymentSources, TGetPaymentSourcesResponse } from 'src/shared/api/paymentsSourceApi.ts';
import { useEffect, useState } from 'react';
import AddPaymentSourceModal from 'src/widgets/Modal/AddPaymantSourceModal/AddPaymentSourceModal.tsx';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { handleError } from 'src/utils/errorHandler.ts';

type TPaymentSourcesSelectProps = {
  selectedPaymentSourceId: string;
  setSelectedPaymentSourceId: (value: string) => void;
  isCreateExpensePending?: boolean;
};

const PaymentSourcesSelect = ({
  selectedPaymentSourceId,
  setSelectedPaymentSourceId,
  isCreateExpensePending,
}: TPaymentSourcesSelectProps) => {
  const [isAddPaymentSourceModalOpen, setIsAddPaymentSourceModalOpen] = useState(false);
  //TODO move to state management and request on user enter
  const {
    data: paymentSources,
    isPending: isGetPaymentSourcesPending,
    error: getPaymentSourcesError,
  } = useQuery<TGetPaymentSourcesResponse, TErrorResponse>({
    queryFn: getPaymentSources,
    queryKey: ['paymentSources'],
  });

  useEffect(() => {
    if (getPaymentSourcesError) {
      handleError(getPaymentSourcesError);
    }
  }, [getPaymentSourcesError]);

  const isDisabled = isGetPaymentSourcesPending || isCreateExpensePending;
  const selectedPaymentSource = paymentSources?.find((source) => source._id === selectedPaymentSourceId);

  return (
    <>
      <Stack direction="row" alignItems="end">
        <Autocomplete
          size="small"
          fullWidth
          disabled={isDisabled}
          disablePortal
          options={paymentSources || []}
          renderInput={(params) => <TextField {...params} label="Payment source" />}
          value={selectedPaymentSource}
          onChange={(_e, value) => setSelectedPaymentSourceId(value?._id || '')}
          getOptionLabel={(option) => option.title}
        />
        <IconButton aria-label="add" disabled={isDisabled} onClick={() => setIsAddPaymentSourceModalOpen(true)}>
          <AddCircle />
        </IconButton>
      </Stack>
      {isAddPaymentSourceModalOpen && (
        <AddPaymentSourceModal closePaymentSourcesModal={() => setIsAddPaymentSourceModalOpen(false)} />
      )}
    </>
  );
};

export default PaymentSourcesSelect;
