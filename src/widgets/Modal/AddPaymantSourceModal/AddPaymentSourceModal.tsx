import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddPaymentSourceForm from 'src/widgets/Forms/AddExpenseForm/AddPaymentSourceForm.tsx';

type TAddPaymentSourceModalProps = {
  closePaymentSourcesModal: () => void;
};

const AddPaymentSourceModal = ({ closePaymentSourcesModal }: TAddPaymentSourceModalProps) => {
  return (
    <ModalWrapper onClickAway={closePaymentSourcesModal}>
      <AddPaymentSourceForm closeModal={closePaymentSourcesModal} />
    </ModalWrapper>
  );
};

export default AddPaymentSourceModal;
