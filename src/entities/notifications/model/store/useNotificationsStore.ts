import createSelectors from 'src/utils/helpers/createSelectors.ts';
import { create } from 'zustand';

type TUseNotificationsStore = {
  isModalOpen: boolean;
  toggleIsModalOpen: () => void;
};

const _useNotificationsStore = create<TUseNotificationsStore>((set, get) => ({
  isModalOpen: false,
  toggleIsModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
}));

export default createSelectors(_useNotificationsStore);
