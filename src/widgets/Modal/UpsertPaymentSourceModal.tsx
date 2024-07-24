import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import UpsertPaymentSourceForm from 'src/entities/paymentSource/ui/UpsertPaymentSourceForm.tsx';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';

type TUpsertPaymentSourceModalProps = {
  setSelectedPaymentSource?: (paymentSource: string) => void;
};

const UpsertPaymentSourceModal = ({ setSelectedPaymentSource }: TUpsertPaymentSourceModalProps) => {
  const isPaymentSourcesModalOpen = usePaymentSourcesStore.use.isPaymentSourcesModalOpen();
  const setIsPaymentSourcesModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

  const closePaymentSourcesModal = () => {
    setIsPaymentSourcesModalOpen(false);
  };

  return (
    <ModalWrapper onClickAway={closePaymentSourcesModal} isModalOpen={isPaymentSourcesModalOpen}>
      <UpsertPaymentSourceForm setSelectedPaymentSource={setSelectedPaymentSource} />
    </ModalWrapper>
  );
};

export default UpsertPaymentSourceModal;
