import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  createPaymentSource,
  TCreatePaymentSourceInput,
  TPaymentSource,
  updatePaymentSource,
} from 'src/shared/api/paymentsSourceApi.ts';
import { useState } from 'react';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Colorful } from '@uiw/react-color';
import getRandomHexColor from 'src/utils/helpers/getRandomHexColor.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import { useTranslation } from 'react-i18next';

type TUpsertPaymentSourceFormProps = {
  setSelectedPaymentSource?: (paymentSource: string) => void;
};

const UpsertPaymentSourceForm = ({ setSelectedPaymentSource }: TUpsertPaymentSourceFormProps) => {
  const paymentSource = usePaymentSourcesStore.use.currentEditingPaymentSource?.();
  const setCurrentEditingPaymentSource = usePaymentSourcesStore.use.setCurrentEditingPaymentSource();
  const setIsPaymentSourcesModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

  const [title, setTitle] = useState(paymentSource?.title || '');
  const [color, setColor] = useState(paymentSource?.color || getRandomHexColor());
  const [comments, setComments] = useState(paymentSource?.comments || '');
  const { fetchPaymentSources } = useLoadPaymentSources();
  const theme = useTheme();
  const { t } = useTranslation('accounts');

  const closeModal = () => {
    setIsPaymentSourcesModalOpen(false);
  };

  const handleSuccess = (paymentSource: TPaymentSource) => {
    fetchPaymentSources();
    setCurrentEditingPaymentSource(undefined);

    if (setSelectedPaymentSource) {
      setSelectedPaymentSource(paymentSource._id);
    }

    closeModal();
  };

  const { mutate: createPaymentSourceMutate, isPending: isCreatePaymentSourcePending } = useMutation({
    mutationFn: createPaymentSource,
    onError: (error) => handleError(error),
    onSuccess: handleSuccess,
  });
  const { mutate: updatePaymentSourceMutate, isPending: isUpdatePaymentSourcePending } = useMutation<
    TPaymentSource,
    TErrorResponse,
    TCreatePaymentSourceInput & { _id: string }
  >({
    mutationFn: ({ _id, ...data }) => updatePaymentSource(_id, data),
    onError: (error) => handleError(error),
    onSuccess: handleSuccess,
  });

  const upsertPaymentSource = () => {
    if (paymentSource?._id) {
      updatePaymentSourceMutate({ color, title, comments, _id: paymentSource._id });
    } else {
      createPaymentSourceMutate({ color, title, comments });
    }
  };

  const isPending = isCreatePaymentSourcePending || isUpdatePaymentSourcePending;

  return (
    <FormWrapper>
      <Typography variant="h5" textAlign="center">
        {t('Save payment source')}
      </Typography>
      <FormGroup>
        <Stack gap={1} paddingY={2}>
          <Colorful color={color} onChange={(color) => setColor(color.hex)} disableAlpha style={{ width: '100%' }} />{' '}
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: color, color: theme.palette.getContrastText(color) }}
            onClick={() => {
              setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
            }}
          >
            {t('Random Color')}
          </Button>
          <FormControl disabled={isPending}>
            <InputLabel size="small">{t('Title')}</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl disabled={isPending}>
            <InputLabel size="small">{t('Comments')}</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button variant="outlined" type="submit" onClick={upsertPaymentSource} disabled={isPending}>
            {paymentSource?._id ? `${t('Update')}` : `${t('Create')}`}
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default UpsertPaymentSourceForm;
