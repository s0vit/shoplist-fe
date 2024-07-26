import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
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

type TLoginFormProps = {
  setCurrentTabToRecovery: () => void;
};

const LoginForm = ({ setCurrentTabToRecovery }: TLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
        <Stack spacing={1}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoginPending}
              type="text"
              label="Email"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoginPending}
              type={showPassword ? 'text' : 'password'}
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
              label="Password"
            />
          </FormControl>
          <Button type="submit" disabled={isLoginPending} variant="outlined">
            Login
          </Button>
          <Typography variant="body1" align="center" paddingTop={5}>
            Forgot password?
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color={theme.palette.primary.main}
            onClick={setCurrentTabToRecovery}
          >
            Click here to recover password
          </Typography>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
