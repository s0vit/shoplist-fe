import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';

type TExpenseModalProps = {
  closeModal: () => void;
};

const ExpenseModal = ({ closeModal }: TExpenseModalProps) => {
  return (
    <ModalWrapper onClickAway={closeModal}>
      {/*<AddExpenseForm />*/}
      <AddExpenseCalculator />
    </ModalWrapper>
  );
};

export default ExpenseModal;
