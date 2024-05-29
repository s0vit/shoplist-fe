import { Link } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to={RoutesEnum.Profile}>Go to Profile</Link>
    </div>
  );
};

export default HomePage;
