import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Box, Stack, Typography } from 'src/shared/ui-kit';

import { Button } from 'src/shared/ui-kit';

import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { login, resetPassword, TLoginRequest, TUser } from 'src/shared/api/authApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { useTranslation } from 'react-i18next';

type TSetNewPasswordFormProps = {
  token: string;
};

const SetNewPasswordForm = ({ token }: TSetNewPasswordFormProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentToastId, setCurrentToastId] = useState<Id>();

  const { email } = jwtDecode<{ email: string }>(token);
  const navigate = useNavigate();
  const setUser = useUserStore.use.setUser();
  const { t } = useTranslation('loginPage');

  const { mutate: sendLoginRequest } = useMutation<TUser, TErrorResponse, TLoginRequest>({
    mutationFn: ({ email, password }: TLoginRequest) => {
      toast.dismiss(currentToastId);
      setCurrentToastId(toast('Logging in...', { isLoading: true, autoClose: false }));

      return login({ email, password });
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.dismiss(currentToastId);
      navigate('/');
    },
    onError: (error) => {
      handleError(error);
      navigate('/login');
    },
  });

  const { isPending: isPendingSetNewPassword, mutate: requestSetNewPassword } = useMutation<void, TErrorResponse>({
    mutationFn: () => resetPassword({ token, password }),
    onError: (error) => handleError(error),
    onSuccess: () => {
      toast.dismiss(currentToastId);
      setCurrentToastId(toast('Password has been reset', { type: 'success' }));
      sendLoginRequest({ email, password });
    },
  });

  return (
    <Box>
      <FormWrapper elevation={5}>
        <Form onSubmit={() => requestSetNewPassword()}>
          <Stack gap={1}>
            <Typography variant="h3" align="center">
              {t('Set new password')}
            </Typography>
            <FormControl style={{ margin: 8, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">{t('Password')}</InputLabel>
              <OutlinedInput
                disabled={isPendingSetNewPassword}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? 'text' : 'password'}
                label={t('Password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant="outlined"
              type="submit"
              disabled={isPendingSetNewPassword}
              label={t('Reset password')}
              width="100%"
            />
          </Stack>
        </Form>
      </FormWrapper>
    </Box>
  );
};

export default SetNewPasswordForm;
