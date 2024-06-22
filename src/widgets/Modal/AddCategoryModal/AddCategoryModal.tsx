import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import AddCategoryForm from 'src/widgets/Forms/AddExpenseForm/AddCategoryForm.tsx';

type TAddCategoryModalProps = {
  closeCategoryModal: () => void;
  isCategoryModalOpen: boolean;
  setSelectedCategory: (categoryId: string) => void;
};

const AddCategoryModal = ({ closeCategoryModal, isCategoryModalOpen, setSelectedCategory }: TAddCategoryModalProps) => {
  return (
    <ModalWrapper onClickAway={closeCategoryModal} isModalOpen={isCategoryModalOpen}>
      <AddCategoryForm closeModal={closeCategoryModal} setSelectedCategory={setSelectedCategory} />
    </ModalWrapper>
  );
};

export default AddCategoryModal;
