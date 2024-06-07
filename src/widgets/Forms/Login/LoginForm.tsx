import { Button, Stack, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { useState } from 'react';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';
import { TLoginRequest } from 'src/shared/api/authApi.ts';

type TLoginFormProps = {
  sendLoginRequest: (data: TLoginRequest) => void;
};

const LoginForm = ({ sendLoginRequest }: TLoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = useStableCallback(() => {
    sendLoginRequest({ email, password });
  });
  return (
    <FormWrapper elevation={5}>
      <Form onSubmit={handleLoginClick}>
        <Stack spacing={2}>
          <Typography variant="h4">Login</Typography>
          <TextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <Button type="submit">Login</Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
