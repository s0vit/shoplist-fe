import { TUserStore } from 'src/entities/user/model/types/TUserStore.ts';

const selectUserData = (state: TUserStore) => state.user;

export default selectUserData;
