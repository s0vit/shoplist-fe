import { useMutation } from '@tanstack/react-query';
import { updateCategoryOrder, TCategory } from 'src/shared/api/categoryApi.ts';

type TArgs = {
  id: string;
  newIndex: number;
};

const useUpdateCategoryOrder = (onSuccess?: (data: TCategory) => void) =>
  useMutation({
    mutationFn: ({ id, newIndex }: TArgs) => updateCategoryOrder(id, newIndex),
    onSuccess,
  });

export default useUpdateCategoryOrder;
