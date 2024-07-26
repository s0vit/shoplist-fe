import useAccessControlStore from 'src/entities/accessControl/model/useAccessControlStore.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { logout } from 'src/shared/api/authApi.ts';
import handleError from 'src/utils/errorHandler.ts';

const useLogout = () => {
  const resetUserStore = useUserStore.use.resetStore();
  const resetExpensesStore = useExpensesStore.use.resetStore();
  const resetCategoryStore = useCategoryStore.use.resetStore();
  const resetPaymentSourceStore = usePaymentSourcesStore.use.resetStore();
  const resetFiltersStore = useFiltersStoreForExpenses.use.resetStore();
  const resetAccessControlStore = useAccessControlStore.use.resetStore();

  const handleLogout = () => {
    logout()
      .then(() => {
        resetUserStore();
        resetExpensesStore();
        resetCategoryStore();
        resetPaymentSourceStore();
        resetFiltersStore();
        resetAccessControlStore();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .catch(handleError);
  };

  return { handleLogout };
};

export default useLogout;
