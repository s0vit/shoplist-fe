import { create } from 'zustand';
import { TUser } from 'src/shared/api/authApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

type TUserStore = {
  user?: TUser;
  setUser: (userData?: TUser) => void;
};

const _useUserStore = create<TUserStore>((set) => ({
  user: undefined,
  setUser: (userData) => set(() => ({ user: userData })),
}));

export default createSelectors(_useUserStore);
