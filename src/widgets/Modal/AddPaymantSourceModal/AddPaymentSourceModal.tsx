import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddPaymentSourceForm from 'src/widgets/Forms/AddExpenseForm/AddPaymentSourceForm.tsx';

type TAddPaymentSourceModalProps = {
  closePaymentSourcesModal: () => void;
  isPaymentSourcesModalOpen: boolean;
};

const AddPaymentSourceModal = ({
  closePaymentSourcesModal,
  isPaymentSourcesModalOpen,
}: TAddPaymentSourceModalProps) => {
  return (
    <ModalWrapper onClickAway={closePaymentSourcesModal} isModalOpen={isPaymentSourcesModalOpen}>
      <AddPaymentSourceForm closeModal={closePaymentSourcesModal} />
    </ModalWrapper>
  );
};

export default AddPaymentSourceModal;
