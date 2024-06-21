import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { Box } from '@mui/material';

const ExpenseModal = () => {
  const isExpenseModalOpen = useExpensesStore.use.isEditExpenseModalOpen?.();
  const setIsEditExpenseModalOpen = useExpensesStore.use.setIsEditExpenseModalOpen();

  const closeModal = () => {
    setIsEditExpenseModalOpen(false);
  };

  return (
    <ModalWrapper onClickAway={closeModal} isModalOpen={isExpenseModalOpen}>
      <Box position="fixed" bottom={0} right={0} maxWidth="100%">
        <AddExpenseCalculator closeModal={closeModal} />
      </Box>
    </ModalWrapper>
  );
};

export default ExpenseModal;
