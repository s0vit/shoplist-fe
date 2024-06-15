import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddCategoryForm from 'src/widgets/Forms/AddExpenseForm/AddCategoryForm.tsx';

type TAddCategoryModalProps = {
  closeCategoryModal: () => void;
  isCategoryModalOpen: boolean;
};

const AddCategoryModal = ({ closeCategoryModal, isCategoryModalOpen }: TAddCategoryModalProps) => {
  return (
    <ModalWrapper onClickAway={closeCategoryModal} isModalOpen={isCategoryModalOpen}>
      <AddCategoryForm closeModal={closeCategoryModal} />
    </ModalWrapper>
  );
};

export default AddCategoryModal;
