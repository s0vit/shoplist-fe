import { TUserStore } from 'src/entities/user/model/types/TUserStore.ts';

export const selectUserData = (state: TUserStore) => state.user;

export default selectUserData;
