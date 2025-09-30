import { Stack, TextField, Button, Typography, IconButton } from 'src/shared/ui-kit';

import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { confirmEmail, login, register, TConfirmEmailResponse, TLoginRequest, TUser } from 'src/shared/api/authApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation('loginPage');

  const toastId = useRef<Id>(undefined);
  const navigate = useNavigate();
  const setUser = useUserStore.use.setUser();

  const { isPending: isRegisterPending, mutate: registerMutate } = useMutation<void, TErrorResponse>({
    mutationFn: () => register({ email, password }),
    onSuccess: () => {
      toast.dismiss(toastId.current!);
      toastId.current = toast('Check your email to confirm registration', { type: 'warning', autoClose: false });
      setIsRegistered(true);
    },
    onError: (error) => {
      toast.dismiss(toastId.current!);
      toastId.current = handleError(error);
    },
  });

  const { isPending: isConfirmPending, mutate: confirmMutate } = useMutation<TConfirmEmailResponse, TErrorResponse>({
    mutationFn: () => confirmEmail({ token: code }),
    onSuccess: () => {
      toast.dismiss(toastId.current);
      toastId.current = toast('Email confirmed', { type: 'success', autoClose: 3000 });
      setIsConfirmed(true);
      sendLoginRequest({ email, password });
    },
    onError: (error) => {
      toast.dismiss(toastId.current);
      toastId.current = handleError(error);
    },
  });

  const { mutate: sendLoginRequest } = useMutation<TUser, TErrorResponse, TLoginRequest>({
    mutationFn: ({ email, password }: TLoginRequest) => {
      toast.dismiss(toastId.current);
      toastId.current = toast('Logging in...', { isLoading: true, autoClose: false });

      return login({ email, password });
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.dismiss(toastId.current);
      navigate('/');
    },
    onError: (error) => {
      handleError(error);
      navigate('/login');
    },
  });

  const handleRegisterSubmit = () => {
    if (password !== confirmPassword) {
      toast.dismiss(toastId.current);
      toastId.current = toast('Passwords do not match', { type: 'error' });

      return;
    }

    toast.dismiss(toastId.current);
    toastId.current = toast('Registering...', { isLoading: isRegisterPending, autoClose: false });
    registerMutate();
  };

  return (
    <FormWrapper elevation={5}>
      {isRegistered ? (
        isConfirmed ? (
          <Stack gap={1}>
            <Typography variant="h3" align="center">
              {t('Registration finished!')}
            </Typography>
            <Typography>{t('You now will be redirected')}</Typography>
          </Stack>
        ) : (
          <Form onSubmit={() => confirmMutate()}>
            <Stack gap={1}>
              <Typography variant="h3" align="center">
                {t('Registration successful!')}
              </Typography>
              <Typography>{t('Confirm your email. Enter code from letter')}</Typography>
              <TextField
                disabled={isConfirmPending}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
                fullWidth
                size="small"
              />
              <Button disabled={isConfirmPending} variant="outlined" type="submit" label={t('Confirm')} width="100%" />
            </Stack>
          </Form>
        )
      ) : (
        <Form onSubmit={handleRegisterSubmit}>
          <Stack gap={1}>
            <Typography variant="h3" align="center">
              {t('Register')}
            </Typography>
            <TextField
              disabled={isRegisterPending}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('Email')}
              fullWidth
              size="small"
            />
            <TextField
              disabled={isRegisterPending}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={t('Password')}
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
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              disabled={isRegisterPending}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('Confirm Password')}
              helperText={t('Password should contain 1 number and 1 capital letter')}
              fullWidth
              size="small"
              endAdornment={
                <IconButton
                  icon={showConfirmPassword ? 'eyeSlash' : 'eye'}
                  iconSize="sm"
                  variant="text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            <Button disabled={isRegisterPending} type="submit" variant="outlined" label={t('Register')} width="100%" />
          </Stack>
        </Form>
      )}
    </FormWrapper>
  );
};

export default RegisterForm;
