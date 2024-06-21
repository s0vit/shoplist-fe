import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import UpsertPaymentSourceForm from 'src/entities/paymentSource/ui/UpsertPaymentSourceForm.tsx';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';

const UpsertPaymentSourceModal = () => {
  const isPaymentSourcesModalOpen = usePaymentSourcesStore.use.isPaymentSourcesModalOpen();
  const setIsPaymentSourcesModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

  const closePaymentSourcesModal = () => {
    setIsPaymentSourcesModalOpen(false);
  };

  return (
    <ModalWrapper onClickAway={closePaymentSourcesModal} isModalOpen={isPaymentSourcesModalOpen}>
      <UpsertPaymentSourceForm />
    </ModalWrapper>
  );
};

export default UpsertPaymentSourceModal;
