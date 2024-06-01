import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';
import { useMutation } from '@tanstack/react-query';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import LoginForm from 'src/entities/user/ui/LoginForm.tsx';
import { login } from 'src/shared/api/authApi.ts';
import RegisterForm from 'src/entities/user/ui/RegisterForm.tsx';
import { Box, Tab } from '@mui/material';
import { CenteredTabsWrapper } from 'src/entities/user/ui/CenteredTabsWrapper.tsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTab, setCurrentTab] = useState<'login' | 'register'>('login');

  const setUser = useUserStore((state) => state.setUser);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate, error, data } = useMutation({
    mutationFn: () => login({ email, password }),
  });

  const handleLoginClick = useStableCallback(() => {
    mutate();
  });

  if (error) {
    console.error({ error });
  }

  useEffect(() => {
    if (data) {
      setUser(data);
      const redirectTo = searchParams.get('to')?.split('?')[0];
      const otherPartOfUrl = redirectTo
        ? window.location.href.split(redirectTo)[1]
        : window.location.href.split(RoutesEnum.Root)[1];

      const redirectUrl = redirectTo ? redirectTo + otherPartOfUrl : RoutesEnum.Root + otherPartOfUrl;
      navigate(redirectUrl);
    }
  }, [data, navigate, searchParams, setUser]);
  return (
    <Box>
      <CenteredTabsWrapper value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
        <Tab value="login" label="Login" />
        <Tab value="register" label="Register" />
      </CenteredTabsWrapper>
      {currentTab === 'login' && (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLoginClick={handleLoginClick}
        />
      )}
      {currentTab === 'register' && <RegisterForm />}
    </Box>
  );
};

export default LoginPage;
