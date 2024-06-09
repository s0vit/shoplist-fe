import { jwtDecode } from 'jwt-decode';

export const rootLoader = () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    const { exp } = jwtDecode(refreshToken);
    console.info(exp, 'refreshToken exists, should validate and do a request to receive new access token');
  }

  return null;
};
