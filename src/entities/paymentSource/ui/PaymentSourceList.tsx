import { TPaymentSource } from 'src/shared/api/paymentsSourceApi';
import SkeletonForCalc from 'src/utils/components/Skeleton.tsx';
import HorizontalList from 'src/widgets/HorizontalList/HorizontalList.tsx';

type TPaymentSourceListProps = {
  paymentSources: TPaymentSource[];
  isPending: boolean;
  selectedPaymentSource: string;
  setSelectedPaymentSource: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  isLoading: boolean;
};

const PaymentSourceList = ({
  paymentSources,
  isPending,
  selectedPaymentSource,
  setSelectedPaymentSource,
  openModal,
  handleDelete,
  isLoading,
}: TPaymentSourceListProps) => {
  return isLoading ? (
    <SkeletonForCalc />
  ) : (
    <HorizontalList
      items={paymentSources}
      disabled={isPending}
      selectedItem={selectedPaymentSource}
      setSelectedItem={setSelectedPaymentSource}
      openModal={openModal}
      handleDelete={handleDelete}
      handleShare={(id) => alert(`not implemented yet ${id}`)}
      handleEdit={(item) => alert(`not implemented yet ${item}`)}
    />
  );
};

export default PaymentSourceList;
