import {create} from "zustand"
import {TUserStore} from "src/entities/user/model/types/TUserStore.ts";

const useUserStore = create<TUserStore>()((set)=>({
    email: undefined,
    setEmail: (newEmail)=> set(()=>({email: newEmail}))
}))

export default useUserStore