import useUserStore from "src/entities/user/model/store/useUserStore.ts";
import selectUserEmail from "src/entities/user/model/selectors/selectUserEmail.ts";

const Profile = () => {

    const userEmail = useUserStore(selectUserEmail);
    return (
        <div>
            {userEmail}
        </div>
    );
};

export default Profile;