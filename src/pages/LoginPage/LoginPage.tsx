import { SyntheticEvent, useState } from 'react';
import LoginForm from 'src/widgets/Forms/Login/LoginForm.tsx';
import RegisterForm from 'src/widgets/Forms/Register/RegisterForm.tsx';
import { Stack, Tab } from '@mui/material';
import { CenteredTabsWrapper } from 'src/widgets/Forms/Login/CenteredTabsWrapper.tsx';
import RequestPasswordRecoveryForm from 'src/widgets/Forms/RequestPasswordRecovery/RequestPasswordRecoveryForm.tsx';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';

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

  const onCenteredTabsWrapperChange = useStableCallback((_: SyntheticEvent, newValue: string) =>
    setCurrentTab({ ...tabs.find((tab) => tab.value === newValue)! }),
  );

  const loginFormSetCurrentTabToRecovery = useStableCallback(() => {
    setCurrentTab(tabs[2]);
  });

  return (
    <Stack direction="column" gap={2}>
      <CenteredTabsWrapper value={currentTab.value} onChange={onCenteredTabsWrapperChange}>
        <Tab label={tabs[0].label} value={tabs[0].value} wrapped />
        <Tab label={tabs[1].label} value={tabs[1].value} wrapped />
        {currentTab.value === TabValuesEnum.RequestPassRecover && (
          <Tab label={tabs[2].label} value={tabs[2].value} wrapped />
        )}
      </CenteredTabsWrapper>
      {currentTab.value === TabValuesEnum.Login && (
        <LoginForm setCurrentTabToRecovery={loginFormSetCurrentTabToRecovery} />
      )}
      {currentTab.value === TabValuesEnum.Register && <RegisterForm />}
      {currentTab.value === TabValuesEnum.RequestPassRecover && <RequestPasswordRecoveryForm />}
    </Stack>
  );
};

export default LoginPage;
