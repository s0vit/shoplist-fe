import { TUser } from 'src/shared/api/authApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';
import { create } from 'zustand';

type TUserStore = {
  user?: TUser;
  setUser: (userData?: TUser) => void;
  resetStore: () => void;
};

const _useUserStore = create<TUserStore>((set) => ({
  user: undefined,
  setUser: (userData) => set(() => ({ user: userData })),
  resetStore: () => set(() => ({ user: undefined })),
}));

export default createSelectors(_useUserStore);
