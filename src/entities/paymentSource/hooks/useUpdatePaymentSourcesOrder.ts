import { useMutation } from '@tanstack/react-query';
import { updatePaymentSourceOrder, TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';

type TArgs = {
  updatedSources: TPaymentSource[];
  originalSources: TPaymentSource[];
};

const useUpdatePaymentSourcesOrder = (onSuccess?: (data: TPaymentSource[]) => void) => {
  return useMutation({
    mutationFn: async ({ updatedSources, originalSources }: TArgs) => {
      const changedSources = updatedSources.filter((source, index) => {
        const original = originalSources.find((s) => s._id === source._id);

        return original && original.order !== index;
      });

      const updates = changedSources.map((source, index) => updatePaymentSourceOrder(source._id, index));

      return await Promise.all(updates);
    },
    onSuccess,
  });
};

export default useUpdatePaymentSourcesOrder;
