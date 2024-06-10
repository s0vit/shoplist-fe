import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useState } from 'react';
import AddPaymentSourceModal from 'src/widgets/Modal/AddPaymantSourceModal/AddPaymentSourceModal.tsx';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';

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

  const selectedPaymentSource = paymentSources?.find((source) => source._id === selectedPaymentSourceId);

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
          onChange={(_e, value) => setSelectedPaymentSourceId(value?._id || '')}
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
      {isAddPaymentSourceModalOpen && (
        <AddPaymentSourceModal closePaymentSourcesModal={() => setIsAddPaymentSourceModalOpen(false)} />
      )}
    </>
  );
};

export default PaymentSourcesSelect;
