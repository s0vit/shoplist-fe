import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from 'src/shared/api/authApi.ts';
import { toast } from 'react-toastify';
import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { Form } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

type TSetNewPasswordFormProps = {
  token: string;
};

const SetNewPasswordForm = ({ token }: TSetNewPasswordFormProps) => {
  const [password, setPassword] = useState('');

  const {
    isSuccess,
    error,
    mutate: requestSetNewPassword,
  } = useMutation({
    mutationFn: () => resetPassword({ token, password }),
  });

  const setNewPassword = () => {
    requestSetNewPassword();
  };

  useEffect(() => {
    if (isSuccess) {
      toast('Password has been reset', { type: 'success' });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error' });
    }
  }, [error]);
  return (
    <Box>
      <FormWrapper elevation={5}>
        <Form onSubmit={setNewPassword}>
          <Stack spacing={2}>
            <Typography variant="h6">Set new password</Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <Button type="submit">Reset password</Button>
          </Stack>
        </Form>
      </FormWrapper>
    </Box>
  );
};

export default SetNewPasswordForm;
