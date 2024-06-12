import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { createPaymentSource, TCreatePaymentSourceInput, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { matchIsValidColor, MuiColorInput } from 'mui-color-input';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';

type TAddPaymentSourceFormProps = {
  closeModal: () => void;
};

const AddPaymentSourceForm = ({ closeModal }: TAddPaymentSourceFormProps) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [comments, setComments] = useState('');
  const { fetchPaymentSources } = useLoadPaymentSources();
  const {
    mutate: createPaymentSourceMutate,
    error: createPaymentSourceError,
    isPending: isCreatePaymentSourcePending,
    isSuccess: isCreatePaymentSourceSuccess,
  } = useMutation<TPaymentSource, TErrorResponse, TCreatePaymentSourceInput>({
    mutationFn: createPaymentSource,
    mutationKey: ['paymentSources'],
    onSuccess: () => {
      fetchPaymentSources();
      closeModal();
    },
  });

  const addPaymentSource = () => {
    if (matchIsValidColor(color)) {
      createPaymentSourceMutate({ color, title, comments });
    }
  };

  useEffect(() => {
    if (isCreatePaymentSourceSuccess) {
      toast('Payment source added', { type: 'success' });
      fetchPaymentSources();
    }
  }, [isCreatePaymentSourceSuccess, fetchPaymentSources]);

  useEffect(() => {
    if (createPaymentSourceError) {
      handleError(createPaymentSourceError);
    }
  }, [createPaymentSourceError]);

  return (
    <FormWrapper>
      <Typography variant="h5" textAlign="center">
        Add payment source
      </Typography>
      <FormGroup>
        <Stack gap={1}>
          <FormControl disabled={isCreatePaymentSourcePending}>
            <InputLabel size="small">Title</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <MuiColorInput
            disabled={isCreatePaymentSourcePending}
            size="small"
            value={color}
            fallbackValue={Math.random().toString(16).slice(2, 8)}
            isAlphaHidden
            onChange={setColor}
            format="hex"
            sx={{ '& .MuiColorInput-Button': { marginLeft: 2 } }}
          />
          <FormControl disabled={isCreatePaymentSourcePending}>
            <InputLabel size="small">Comments</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button type="submit" onClick={addPaymentSource} disabled={isCreatePaymentSourcePending}>
            Add
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default AddPaymentSourceForm;
