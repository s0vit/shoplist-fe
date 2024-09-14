import { Form } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { useEffect, useState } from 'react';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from 'src/shared/api/authApi.ts';
import { toast } from 'react-toastify';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { useTranslation } from 'react-i18next';

const RequestPasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation('loginPage');

  const {
    isSuccess,
    isPending: isConfirmPending,
    mutate: requestPassRecovery,
    error,
  } = useMutation<void, TErrorResponse>({
    mutationFn: () => forgotPassword({ email }),
  });

  const handleRecoveryClick = useStableCallback(() => {
    requestPassRecovery();
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast('Check your email to recover password', { type: 'info' });
    }
  }, [isSuccess]);

  return (
    <FormWrapper elevation={5}>
      <Form onSubmit={handleRecoveryClick}>
        <Stack spacing={1}>
          <Typography variant="h4" align="center">
            {t('Password recovery')}
          </Typography>
          <Typography variant="body2">{t('Enter your email to recover password')}</Typography>
          <TextField
            disabled={isConfirmPending}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Email')}
          />
          <Button disabled={isConfirmPending} type="submit" variant="outlined">
            {t('Send recovery link')}
          </Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default RequestPasswordRecoveryForm;
