import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { Box } from 'src/shared/ui-kit';

import styles from './ExpenseModal.module.scss';

const ExpenseModal = () => {
  const isExpenseModalOpen = useExpensesStore.use.isEditExpenseModalOpen?.();
  const setIsEditExpenseModalOpen = useExpensesStore.use.setIsEditExpenseModalOpen();
  const setCurrentEditExpense = useExpensesStore.use.setCurrentEditExpense?.();

  const closeModal = () => {
    setIsEditExpenseModalOpen(false);
    setCurrentEditExpense?.(undefined);
  };

  return (
    <ModalWrapper onClickAway={closeModal} isModalOpen={isExpenseModalOpen}>
      <Box className={styles.modalBox}>
        <AddExpenseCalculator closeModal={closeModal} />
      </Box>
    </ModalWrapper>
  );
};

export default ExpenseModal;
