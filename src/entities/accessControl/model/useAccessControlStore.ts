import { create } from 'zustand';
import { TAccessControl } from 'src/shared/api/accessControlApi.ts';
import createSelectors from 'src/utils/helpers/createSelectors.ts';

type TUseAccessControlStore = {
  isAccessControlModalOpen: boolean;
  myAccessControls: TAccessControl[];
  setMyAccessControls: (myAccessControls: TAccessControl[]) => void;
  setIsAccessControlModalOpen: (isAccessControlModalOpen: boolean) => void;
  resetStore: () => void;
};

const _useAccessControlStore = create<TUseAccessControlStore>((set) => ({
  myAccessControls: [],
  isAccessControlModalOpen: false,
  setIsAccessControlModalOpen: (isAccessControlModalOpen) => set({ isAccessControlModalOpen }),
  setMyAccessControls: (myAccessControls) => set({ myAccessControls }),
  resetStore: () => set({ myAccessControls: [], isAccessControlModalOpen: false }),
}));

export default createSelectors(_useAccessControlStore);
