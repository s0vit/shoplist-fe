import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddExpenseCalculator from 'src/widgets/Forms/AddExpenseForm/AddExpenseCalc.tsx';

type TExpenseModalProps = {
  closeModal: () => void;
  isExpenseModalOpen?: boolean;
};

const ExpenseModal = ({ closeModal, isExpenseModalOpen }: TExpenseModalProps) => {
  return (
    <ModalWrapper onClickAway={closeModal} isModalOpen={isExpenseModalOpen}>
      <AddExpenseCalculator closeModal={closeModal} />
    </ModalWrapper>
  );
};

export default ExpenseModal;
