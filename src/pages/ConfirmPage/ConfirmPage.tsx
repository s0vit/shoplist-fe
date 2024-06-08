import { useSearchParams } from 'react-router-dom';
import ConfirmEmailComponent from 'src/utils/components/ConfirmEmailComponent.tsx';

const ConfirmPage = () => {
  const [params] = useSearchParams();
  const token = params.get('token');

  return token && <ConfirmEmailComponent token={token} />;
};

export default ConfirmPage;
