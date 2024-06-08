import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddExpenseForm from 'src/widgets/Forms/AddExpenseForm/AddExpenseForm.tsx';

type TExpenseModalProps = {
  closeModal: () => void;
};

const ExpenseModal = ({ closeModal }: TExpenseModalProps) => {
  return (
    <ModalWrapper onClickAway={closeModal}>
      <AddExpenseForm />
    </ModalWrapper>
  );
};

export default ExpenseModal;
