import { Stack, TextField, IconButton, Button, Typography } from 'src/shared/ui-kit';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Form, useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { login, TLoginRequest, TUser } from 'src/shared/api/authApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { useTranslation } from 'react-i18next';

type TLoginFormProps = {
  setCurrentTabToRecovery: () => void;
};

const LoginForm = ({ setCurrentTabToRecovery }: TLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation('loginPage');

  const setUser = useUserStore((state) => state.setUser);

  const {
    isPending: isLoginPending,
    mutate: sendLoginRequest,
    error,
    data,
  } = useMutation<TUser, TErrorResponse, TLoginRequest>({
    mutationFn: ({ email, password }: TLoginRequest) => login({ email, password }),
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setUser(data);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      const redirectTo = searchParams.get('to')?.split('?')[0];
      const otherPartOfUrl = redirectTo
        ? window.location.href.split(redirectTo)[1]
        : window.location.href.split(RoutesEnum.ROOT)[1];

      const redirectUrl = redirectTo ? redirectTo + otherPartOfUrl : RoutesEnum.ROOT + otherPartOfUrl;
      navigate(redirectUrl);
    }
  }, [data, navigate, searchParams, setUser]);

  const handleLoginClick = useStableCallback(() => {
    sendLoginRequest({ email, password });
  });

  return (
    <FormWrapper elevation={5}>
      <Form onSubmit={handleLoginClick}>
        <Stack gap={1}>
          <Typography variant="h3" align="center">
            {t('Login-frame')}
          </Typography>
          <TextField
            label={t('Email')}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginPending}
            fullWidth
            size="small"
          />
          <TextField
            label={t('Password')}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoginPending}
            fullWidth
            size="small"
            endAdornment={
              <IconButton
                icon={showPassword ? 'eyeSlash' : 'eye'}
                iconSize="sm"
                variant="text"
                onClick={() => setShowPassword(!showPassword)}
              />
            }
          />
          <Button disabled={isLoginPending} variant="outlined" label={t('Login')} width="100%" type="submit" />
          <Typography variant="body1" align="center">
            {t('Forgot password?')}
          </Typography>
          <Typography variant="body2" align="center" onClick={setCurrentTabToRecovery}>
            {t('Click here to recover password')}
          </Typography>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
