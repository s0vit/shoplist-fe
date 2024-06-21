import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import UpsertPaymentSourceModal from 'src/entities/paymentSource/ui/UpsertPaymentSourceModal.tsx';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';

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

  const paymentSources = usePaymentSourcesStore(selectUserPaymentSources);

  const onAutocompleteChange = useStableCallback((_e: SyntheticEvent, value: TPaymentSource | null) => {
    if (value === null || paymentSources?.some((source) => source._id === value._id)) {
      setSelectedPaymentSourceId(value?._id || '');
    } else {
      setSelectedPaymentSourceId('');
    }
  });

  const selectedPaymentSource = paymentSources?.find((source) => source._id === selectedPaymentSourceId) || null;

  return (
    <>
      <Stack direction="row" alignItems="end">
        <Autocomplete
          size="small"
          fullWidth
          disabled={isCreateExpensePending}
          disablePortal
          options={paymentSources || []}
          renderInput={(params) => <TextField {...params} label="Payment source" />}
          value={selectedPaymentSource}
          onChange={onAutocompleteChange}
          getOptionLabel={(option) => option.title}
        />
        <IconButton
          aria-label="add"
          disabled={isCreateExpensePending}
          onClick={() => setIsAddPaymentSourceModalOpen(true)}
        >
          <AddCircle />
        </IconButton>
      </Stack>
      <UpsertPaymentSourceModal
        closePaymentSourcesModal={() => setIsAddPaymentSourceModalOpen(false)}
        isPaymentSourcesModalOpen={isAddPaymentSourceModalOpen}
      />
    </>
  );
};

export default PaymentSourcesSelect;
