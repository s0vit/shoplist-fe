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
    isPending: isConfirmPending,
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
        <Stack spacing={1}>
          <Typography variant="h4" align="center">
            Password recovery
          </Typography>
          <Typography variant="body2">Enter your email to recover password</Typography>
          <TextField
            disabled={isConfirmPending}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Button disabled={isConfirmPending} type="submit" variant="outlined">
            Send recovery link
          </Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default RequestPasswordRecoveryForm;
