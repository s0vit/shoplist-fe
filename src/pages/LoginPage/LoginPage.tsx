import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useMutation } from '@tanstack/react-query';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import LoginForm from 'src/widgets/Forms/Login/LoginForm.tsx';
import { login, TLoginRequest } from 'src/shared/api/authApi.ts';
import RegisterForm from 'src/widgets/Forms/Register/RegisterForm.tsx';
import { Stack, Tab } from '@mui/material';
import { CenteredTabsWrapper } from 'src/widgets/Forms/Login/CenteredTabsWrapper.tsx';
import RequestPasswordRecoveryForm from 'src/widgets/Forms/RequestPasswordRecovery/RequestPasswordRecoveryForm.tsx';

type TTab = {
  label: string;
  value: TabValuesEnum;
};

enum TabValuesEnum {
  Login = 'login',
  Register = 'register',
  RequestPassRecover = 'requestPassRecover',
}

const LoginPage = () => {
  const tabs: TTab[] = [
    { label: 'login', value: TabValuesEnum.Login },
    { label: 'register', value: TabValuesEnum.Register },
    { label: 'password recovery', value: TabValuesEnum.RequestPassRecover },
  ];
  const [currentTab, setCurrentTab] = useState<(typeof tabs)[number]>(tabs[0]);

  const setUser = useUserStore((state) => state.setUser);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    mutate: sendLoginRequest,
    error,
    data,
  } = useMutation({
    mutationFn: ({ email, password }: TLoginRequest) => login({ email, password }),
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
    <Stack direction="column" gap={2}>
      <CenteredTabsWrapper
        value={currentTab.value}
        onChange={(_, newValue) => setCurrentTab({ ...tabs.find((tab) => tab.value === newValue)! })}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} wrapped />
        ))}
      </CenteredTabsWrapper>
      {currentTab.value === TabValuesEnum.Login && <LoginForm sendLoginRequest={sendLoginRequest} />}
      {currentTab.value === TabValuesEnum.Register && <RegisterForm />}
      {currentTab.value === TabValuesEnum.RequestPassRecover && <RequestPasswordRecoveryForm />}
    </Stack>
  );
};

export default LoginPage;
