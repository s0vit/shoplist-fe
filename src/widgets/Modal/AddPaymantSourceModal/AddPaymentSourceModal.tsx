import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddPaymentSourceForm from 'src/widgets/Forms/AddExpenseForm/AddPaymentSourceForm.tsx';

type TAddPaymentSourceModalProps = {
  closePaymentSourcesModal: () => void;
  isPaymentSourcesModalOpen: boolean;
  setSelectedPaymentSource: (categoryId: string) => void;
};

const AddPaymentSourceModal = ({
  closePaymentSourcesModal,
  isPaymentSourcesModalOpen,
  setSelectedPaymentSource,
}: TAddPaymentSourceModalProps) => {
  return (
    <ModalWrapper onClickAway={closePaymentSourcesModal} isModalOpen={isPaymentSourcesModalOpen}>
      <AddPaymentSourceForm closeModal={closePaymentSourcesModal} setSelectedPaymentSource={setSelectedPaymentSource} />
    </ModalWrapper>
  );
};

export default AddPaymentSourceModal;
