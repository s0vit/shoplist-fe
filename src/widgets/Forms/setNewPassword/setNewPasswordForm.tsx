import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from 'src/shared/api/authApi.ts';
import { toast } from 'react-toastify';
import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Form } from 'react-router-dom';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';

type TSetNewPasswordFormProps = {
  token: string;
};

const SetNewPasswordForm = ({ token }: TSetNewPasswordFormProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    isPending: isPendingSetNewPassword,
    isSuccess,
    error,
    mutate: requestSetNewPassword,
  } = useMutation<void, TErrorResponse>({
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
      handleError(error);
    }
  }, [error]);

  return (
    <Box>
      <FormWrapper elevation={5}>
        <Form onSubmit={setNewPassword}>
          <Stack spacing={1}>
            <Typography variant="h6" align="center">
              Set new password
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" variant="outlined" disabled={isPendingSetNewPassword}>
              Reset password
            </Button>
          </Stack>
        </Form>
      </FormWrapper>
    </Box>
  );
};

export default SetNewPasswordForm;
