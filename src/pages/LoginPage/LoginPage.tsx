import { useState } from 'react';
import LoginForm from 'src/widgets/Forms/Login/LoginForm.tsx';
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
      {currentTab.value === TabValuesEnum.Login && <LoginForm />}
      {currentTab.value === TabValuesEnum.Register && <RegisterForm />}
      {currentTab.value === TabValuesEnum.RequestPassRecover && <RequestPasswordRecoveryForm />}
    </Stack>
  );
};

export default LoginPage;
