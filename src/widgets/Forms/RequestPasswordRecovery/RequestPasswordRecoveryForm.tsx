import { Form } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { useEffect, useState } from 'react';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from 'src/shared/api/authApi.ts';
import { toast } from 'react-toastify';

const RequestPasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');

  const {
    isSuccess,
    mutate: requestPassRecovery,
    error,
  } = useMutation({
    mutationFn: () => forgotPassword({ email }),
  });

  const handleRecoveryClick = useStableCallback(() => {
    requestPassRecovery();
  });

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
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
        <Stack spacing={2}>
          <Typography variant="h4">Email</Typography>
          <TextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Button type="submit">Send recovery link</Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default RequestPasswordRecoveryForm;
