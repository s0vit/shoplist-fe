import { Button, Stack, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { FormWrapper } from 'src/entities/user/ui/FormWrapper';

type TLoginFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLoginClick: () => void;
};

const LoginForm = ({ email, setEmail, password, setPassword, handleLoginClick }: TLoginFormProps) => {
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

          <Button type="submit" onClick={handleLoginClick}>
            Login
          </Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
