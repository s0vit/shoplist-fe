import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import UpsertCategoryForm from 'src/entities/category/ui/UpsertCategoryForm.tsx';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';

const UpsertCategoryModal = () => {
  const isCategoryModalOpen = useCategoryStore.use.isCategoryModalOpen();
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <ModalWrapper onClickAway={closeCategoryModal} isModalOpen={isCategoryModalOpen}>
      <UpsertCategoryForm />
    </ModalWrapper>
  );
};

export default UpsertCategoryModal;
