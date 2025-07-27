import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/ui-kit';

import { Icon } from 'src/shared/ui-kit';
import { Box } from 'src/shared/ui-kit';

import ExpenseItem from 'src/entities/expenses/ui/ExpenseItem.tsx';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { TAccessControl, TCreateAccessControlRequest } from 'src/shared/api/accessControlApi.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { useTranslation } from 'react-i18next';

type TAccessControlSharedExpensesProps = {
  expenses: TExpense[];
  accessControl: TAccessControl;
  categories: TCategory[];
  paymentSources: TPaymentSource[];
  updateAccessControlMutate: (data: { id: string; data: TCreateAccessControlRequest }) => void;
};

const AccessControlSharedExpenses = ({
  accessControl,
  categories,
  expenses,
  paymentSources,
  updateAccessControlMutate,
}: TAccessControlSharedExpensesProps) => {
  const { t } = useTranslation('accessControl');

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<Icon name="chevronDown" size="md" />}>
        {t('Shared expenses: ')} {accessControl.expenseIds.length}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {expenses.map((expense) => {
            const category = categories.find((category) => category._id === expense.categoryId);
            const paymentSource = paymentSources.find((source) => source._id === expense.paymentSourceId);

            return (
              <ExpenseItem
                key={expense._id}
                category={category}
                paymentSource={paymentSource}
                expense={expense}
                handleRemove={(id) => {
                  updateAccessControlMutate({
                    id: accessControl._id,
                    data: {
                      sharedWith: accessControl.sharedWith,
                      categoryIds: accessControl.categoryIds,
                      paymentSourceIds: accessControl.paymentSourceIds,
                      expenseIds: accessControl.expenseIds.filter((expenseId) => expenseId !== id),
                    },
                  });
                }}
              />
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccessControlSharedExpenses;
