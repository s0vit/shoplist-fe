import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import UpsertCategoryForm from 'src/entities/category/ui/UpsertCategoryForm.tsx';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';

type TUpsertCategoryModalProps = {
  setSelectedCategory?: (categoryId: string) => void;
};

const UpsertCategoryModal = ({ setSelectedCategory }: TUpsertCategoryModalProps) => {
  const isCategoryModalOpen = useCategoryStore.use.isCategoryModalOpen();
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <ModalWrapper onClickAway={closeCategoryModal} isModalOpen={isCategoryModalOpen}>
      <UpsertCategoryForm setSelectedCategory={setSelectedCategory} />
    </ModalWrapper>
  );
};

export default UpsertCategoryModal;
