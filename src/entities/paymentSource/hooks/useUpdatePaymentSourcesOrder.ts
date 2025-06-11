import { useMutation } from '@tanstack/react-query';
import { updatePaymentSourceOrder, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';

type TArgs = {
  id: string;
  newIndex: number;
};

const useUpdatePaymentSourcesOrder = (onSuccess?: (data: TPaymentSource) => void) => {
  return useMutation({
    mutationFn: ({ id, newIndex }: TArgs) => updatePaymentSourceOrder(id, newIndex),
    onSuccess,
  });
};

export default useUpdatePaymentSourcesOrder;
