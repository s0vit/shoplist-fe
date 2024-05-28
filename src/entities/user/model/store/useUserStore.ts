import { create } from 'zustand';
import { TUserStore } from 'src/entities/user/model/types/TUserStore.ts';

const useUserStore = create<TUserStore>()((set) => ({
  user: undefined,
  setUser: (userData) => set(() => ({ user: userData })),
}));

export default useUserStore;
