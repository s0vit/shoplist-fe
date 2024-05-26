import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = useStableCallback(() => {
    const redirectTo = searchParams.get('to')?.split('?')[0];
    const otherPartOfUrl = redirectTo
      ? window.location.href.split(redirectTo)[1]
      : window.location.href.split(RoutesEnum.Root)[1];

    const redirectUrl = redirectTo ? redirectTo + otherPartOfUrl : RoutesEnum.Root + otherPartOfUrl;
    navigate(redirectUrl);
  });
  return (
    <div>
      <h1>Login Page</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default LoginPage;
