import { TPaymentSource } from 'src/shared/api/paymentsSourceApi';
import SkeletonForCalc from 'src/utils/components/Skeleton.tsx';
import HorizontalList from 'src/widgets/HorizontalList/HorizontalList.tsx';
import { useEffect, useState } from 'react';

type TPaymentSourceListProps = {
  paymentSources: TPaymentSource[];
  isPending: boolean;
  selectedPaymentSource: string;
  setSelectedPaymentSource: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  isLoading: boolean;
  updateOrder: (data: { _id: string; order: number }) => void;
};

const PaymentSourceList = ({
  paymentSources,
  isPending,
  selectedPaymentSource,
  setSelectedPaymentSource,
  openModal,
  handleDelete,
  isLoading,
  updateOrder,
}: TPaymentSourceListProps) => {
  const [sources, setSources] = useState(paymentSources);

  useEffect(() => {
    setSources(paymentSources);
  }, [paymentSources]);

  return isLoading ? (
    <SkeletonForCalc />
  ) : (
    <HorizontalList
      updateOrder={updateOrder}
      setItems={setSources}
      items={sources}
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
