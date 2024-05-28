import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';

const Profile = () => {
  const userData = useUserStore(selectUserData);
  return (
    <div>
      {userData?.email} - isVerified: {`${userData?.isVerified}`}
    </div>
  );
};

export default Profile;
