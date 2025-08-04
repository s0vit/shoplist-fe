import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Stack, Typography, Button, TextField } from 'src/shared/ui-kit';

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
import styles from './UpsertPaymentSourceForm.module.scss';

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
      <Typography variant="h3" align="center">
        {t('Save payment source')}
      </Typography>
      <Stack gap={1} style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Colorful
          color={color}
          onChange={(color) => setColor(color.hex)}
          disableAlpha
          className={styles.colorfulFullWidth}
        />
        <Button
          label={t('Random Color')}
          variant="contained"
          width="100%"
          onClick={() => setColor(getRandomHexColor())}
          disabled={isPending}
        />
        <TextField
          label={t('Title')}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          size="small"
        />
        <TextField
          label={t('Comments')}
          type="text"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          disabled={isPending}
          size="small"
        />
        <Button
          label={paymentSource?._id ? `${t('Update')}` : `${t('Create')}`}
          variant="outlined"
          width="100%"
          onClick={upsertPaymentSource}
          disabled={isPending}
        />
      </Stack>
    </FormWrapper>
  );
};

export default UpsertPaymentSourceForm;
