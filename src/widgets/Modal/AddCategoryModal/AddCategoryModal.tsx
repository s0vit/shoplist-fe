import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddCategoryForm from 'src/widgets/Forms/AddExpenseForm/AddCategoryForm.tsx';

type TAddCategoryModalProps = {
  closeCategoryModal: () => void;
};

const AddCategoryModal = ({ closeCategoryModal }: TAddCategoryModalProps) => {
  return (
    <ModalWrapper onClickAway={closeCategoryModal}>
      <AddCategoryForm closeModal={closeCategoryModal} />
    </ModalWrapper>
  );
};

export default AddCategoryModal;
