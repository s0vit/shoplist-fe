import { useSearchParams } from 'react-router-dom';
import SetNewPasswordForm from 'src/widgets/Forms/setNewPassword/setNewPasswordForm.tsx';

const PasswordRecoveryPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return token && <SetNewPasswordForm token={token} />;
};

export default PasswordRecoveryPage;
