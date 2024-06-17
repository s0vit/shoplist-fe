export type TUserStore = {
  user?: TUserType;
  setUser: (userData?: TUserType) => void;
};

export type TUserType = {
  _id: string;
  email: string;
  login: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
};
