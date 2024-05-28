import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';
import { useMutation } from '@tanstack/react-query';
import { login } from 'src/shared/api/api.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = useUserStore((state) => state.setUser);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate, error, data } = useMutation({
    mutationFn: () => {
      return login({ email, password });
    },
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
    <div>
      <h1>Login Page</h1>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default LoginPage;
