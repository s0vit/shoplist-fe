import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail, register, TConfirmEmailResponse } from 'src/shared/api/authApi.ts';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toastId = useRef<Id>();

  const {
    isSuccess: isRegisterSuccess,
    isPending: isRegisterPending,
    mutate: registerMutate,
    error: registerError,
  } = useMutation<void, TErrorResponse>({
    mutationFn: () => register({ email, password }),
  });
  const {
    isSuccess: isConfirmSuccess,
    isPending: isConfirmPending,
    mutate: confirmMutate,
    error: confirmError,
  } = useMutation<TConfirmEmailResponse, TErrorResponse>({
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
          <Stack spacing={1}>
            <Typography variant="h4" align="center">
              Registration finished!
            </Typography>
            <Typography>You can now login</Typography>
          </Stack>
        ) : (
          <Form onSubmit={() => confirmMutate()}>
            <Stack spacing={1}>
              <Typography variant="h4" align="center">
                Registration successful!
              </Typography>
              <Typography>Confirm your email. Enter code from letter</Typography>
              <TextField
                disabled={isConfirmPending}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
              />
              <Button disabled={isConfirmPending} type="submit" variant="outlined">
                Confirm
              </Button>
            </Stack>
          </Form>
        )
      ) : (
        <Form onSubmit={handleRegisterSubmit}>
          <Stack spacing={1}>
            <Typography variant="h4" align="center">
              Register
            </Typography>
            <TextField
              disabled={isRegisterPending}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
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
            <TextField
              type="password"
              value={confirmPassword}
              disabled={isRegisterPending}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              helperText="Password should contain 1 number and 1 capital letter"
            />
            <Button disabled={isRegisterPending} type="submit" variant="outlined">
              Register
            </Button>
          </Stack>
        </Form>
      )}
    </FormWrapper>
  );
};

export default RegisterForm;
