import { AddCircle } from '@mui/icons-material';
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import UpsertPaymentSourceModal from 'src/widgets/Modal/UpsertPaymentSourceModal';
import { useTranslation } from 'react-i18next';

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
  const paymentSources = usePaymentSourcesStore(selectUserPaymentSources);
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();
  const { t } = useTranslation('homePage');

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
          renderInput={(params) => (
            <TextField {...params} label={t('Payment source')} InputLabelProps={{ shrink: true }} />
          )}
          value={selectedPaymentSource}
          onChange={onAutocompleteChange}
          getOptionLabel={(option) => option.title}
        />
        <IconButton
          aria-label="add"
          disabled={isCreateExpensePending}
          onClick={() => setIsPaymentSourceModalOpen(true)}
        >
          <AddCircle />
        </IconButton>
      </Stack>
      <UpsertPaymentSourceModal />
    </>
  );
};

export default PaymentSourcesSelect;
