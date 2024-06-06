import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail, register } from 'src/shared/api/authApi.ts';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, Stack, TextField, Typography } from '@mui/material';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const toastId = useRef<Id>();

  const {
    isSuccess: isRegisterSuccess,
    isPending: isRegisterPending,
    mutate: registerMutate,
    error: registerError,
  } = useMutation({
    mutationFn: () => register({ email, password }),
  });
  const {
    isSuccess: isConfirmSuccess,
    mutate: confirmMutate,
    error: confirmError,
  } = useMutation({
    mutationFn: () => confirmEmail({ token: code }),
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

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.dismiss(toastId.current);
      toastId.current = toast('Check your email to confirm registration', { type: 'warning', autoClose: false });
      setIsRegistered(true);
    }
  }, [isRegisterSuccess]);
  useEffect(() => {
    if (isConfirmSuccess) {
      toast.dismiss(toastId.current);
      toastId.current = toast('Email confirmed', { type: 'success', autoClose: 3000 });
      setIsConfirmed(true);
    }
  }, [isConfirmSuccess]);
  useEffect(() => {
    if (registerError && registerError instanceof AxiosError) {
      toast.dismiss(toastId.current);
      toastId.current = toast('Registration failed: ' + registerError.response?.data.message, {
        type: 'error',
        autoClose: false,
      });
    }
  }, [registerError]);
  useEffect(() => {
    if (confirmError && confirmError instanceof AxiosError) {
      toast.dismiss(toastId.current);
      toastId.current = toast('Email confirmation failed: ' + confirmError.response?.data.message, {
        type: 'error',
        autoClose: false,
      });
    }
  }, [confirmError]);

  return (
    <FormWrapper elevation={5}>
      {isRegistered ? (
        isConfirmed ? (
          <Stack>
            <Typography variant="h4">Registration finished!</Typography>
            <Typography>You can now login</Typography>
          </Stack>
        ) : (
          <Stack>
            <Typography variant="h4">Registration successful!</Typography>
            <Typography>Confirm your email. Enter code from letter</Typography>
            <TextField type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
            <Button onClick={() => confirmMutate()}>Confirm</Button>
          </Stack>
        )
      ) : (
        <Stack>
          <Typography variant="h4">Register</Typography>
          <TextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <Button onClick={handleRegisterSubmit}>Register</Button>
        </Stack>
      )}
    </FormWrapper>
  );
};

export default RegisterForm;
