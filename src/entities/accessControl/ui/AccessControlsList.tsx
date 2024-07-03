import { Box } from '@mui/material';
import AccessControlItem from 'src/entities/accessControl/ui/AccessControlItem.tsx';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { TAccessControl } from 'src/shared/api/accessControlApi.ts';

type TAccessControlsListProps = {
  myAccessControls: TAccessControl[];
};

const AccessControlsList = ({ myAccessControls }: TAccessControlsListProps) => {
  const userCategories = useCategoryStore.use.userCategories();
  const userExpenses = useExpensesStore.use.userExpenses();
  const userPaymentSources = usePaymentSourcesStore(selectUserPaymentSources);

  return (
    <Box maxWidth={600} m="auto" mt={2}>
      {myAccessControls.map((accessControl) => (
        <AccessControlItem
          expenses={userExpenses.filter((expense) => accessControl.expenseIds.includes(expense._id))}
          key={accessControl._id}
          accessControl={accessControl}
          categories={userCategories}
          paymentSources={userPaymentSources}
        />
      ))}
    </Box>
  );
};

export default AccessControlsList;
