import { TUserStore } from "src/entities/user/model/types/TUserStore.ts";

export const selectUserEmail = (state: TUserStore) => state.email;

export default selectUserEmail;
