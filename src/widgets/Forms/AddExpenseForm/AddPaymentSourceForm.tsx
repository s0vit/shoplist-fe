import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { createPaymentSource, TCreatePaymentSourceInput, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { useEffect, useState } from 'react';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { Colorful } from '@uiw/react-color';
import getRandomHexColor from 'src/utils/helpers/getRandomHexColor.ts';

type TAddPaymentSourceFormProps = {
  closeModal: () => void;
};

const AddPaymentSourceForm = ({ closeModal }: TAddPaymentSourceFormProps) => {
  const [title, setTitle] = useState('');
  //random color always 6 symbols
  const [color, setColor] = useState(getRandomHexColor());
  const theme = useTheme();
  const [comments, setComments] = useState('');
  const { fetchPaymentSources } = useLoadPaymentSources();
  const {
    mutate: createPaymentSourceMutate,
    error: createPaymentSourceError,
    isPending: isCreatePaymentSourcePending,
  } = useMutation<TPaymentSource, TErrorResponse, TCreatePaymentSourceInput>({
    mutationFn: createPaymentSource,
    mutationKey: ['paymentSources'],
    onSuccess: () => {
      fetchPaymentSources();
      closeModal();
    },
  });

  const addPaymentSource = () => {
    createPaymentSourceMutate({ color, title, comments });
  };

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
            Random Color
          </Button>
          <FormControl disabled={isCreatePaymentSourcePending}>
            <InputLabel size="small">Title</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl disabled={isCreatePaymentSourcePending}>
            <InputLabel size="small">Comments</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button variant="outlined" type="submit" onClick={addPaymentSource} disabled={isCreatePaymentSourcePending}>
            Add
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default AddPaymentSourceForm;
