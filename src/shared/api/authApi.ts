import { apiInstance } from 'src/shared/api/rootApi.ts';

export const login = async ({ email, password }: TLoginRequest): Promise<TUser> => {
  const response = await apiInstance.post<TUser>('auth/login', { email, password });

  return response.data;
};

export type TLoginRequest = {
  email: string;
  password: string;
};
export type TUser = {
  _id: string;
  email: string;
  login: string;
  avatar?: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
};

export const register = async ({ email, password }: TRegisterRequest): Promise<void> => {
  const response = await apiInstance.post<void>('auth/register', { email, password });

  return response.data;
};

type TRegisterRequest = {
  email: string;
  password: string;
};

export const confirmEmail = async ({ token }: TConfirmEmailRequest): Promise<TConfirmEmailResponse> => {
  const response = await apiInstance.get<TConfirmEmailResponse>(`auth/confirm?token=${token}`);

  return response.data;
};

type TConfirmEmailRequest = {
  token: string;
};
export type TConfirmEmailResponse = {
  email: string;
  login: string;
  createdAt: Date;
};

export const getRefreshToken = async ({ refreshToken }: TRefreshTokenRequest): Promise<TRefreshTokenResponse> => {
  const response = await apiInstance.post<TRefreshTokenResponse>('auth/refresh', { refreshToken });

  return response.data;
};

type TRefreshTokenRequest = {
  refreshToken: string;
};
type TRefreshTokenResponse = TUser;

export const logout = async (): Promise<void> => {
  const response = await apiInstance.delete<void>('auth/logout');

  return response.data;
};

export const forgotPassword = async ({ email }: TPasswordRecoveryRequest): Promise<void> => {
  const response = await apiInstance.post<void>('auth/forgot-password', { email });

  return response.data;
};

type TPasswordRecoveryRequest = {
  email: string;
};

export const resetPassword = async ({ token, password }: TPasswordResetRequest): Promise<void> => {
  const response = await apiInstance.post<void>(`auth/reset-password?token=${token}`, { password });

  return response.data;
};

type TPasswordResetRequest = {
  token: string;
  password: string;
};

export const changePassword = async ({ oldPassword, newPassword }: TPasswordChangeRequest): Promise<void> => {
  const response = await apiInstance.put<void>(`auth/change-password`, { oldPassword, newPassword });

  return response.data;
};

type TPasswordChangeRequest = {
  oldPassword: string;
  newPassword: string;
};

export const getNewLink = async (): Promise<void> => {
  const response = await apiInstance.post<void>('auth/request-confirm');

  return response.data;
};
