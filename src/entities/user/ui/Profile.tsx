import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import selectUserData from 'src/entities/user/model/selectors/selectUserData.ts';
import { Link } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';

const Profile = () => {
  const userData = useUserStore(selectUserData);

  return (
    <div>
      <h1>Profile Page</h1>
      <Link to={RoutesEnum.Root}>Go Home</Link>
      <br />
      {userData?.email}
      <br />
      isVerified: {`${userData?.isVerified}`}
      <br />
      login:{userData?.login}
      <br />
    </div>
  );
};

export default Profile;
