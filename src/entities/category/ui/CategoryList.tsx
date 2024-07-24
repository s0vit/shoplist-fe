import { TCategory } from 'src/shared/api/categoryApi';
import SkeletonForCalc from 'src/utils/components/Skeleton.tsx';
import HorizontalList from 'src/widgets/HorizontalList/HorizontalList.tsx';

type TCategoryListProps = {
  categories: TCategory[];
  isPending: boolean;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  isLoading: boolean;
};

const CategoryList = ({
  categories,
  isPending,
  selectedCategory,
  setSelectedCategory,
  openModal,
  handleDelete,
  isLoading,
}: TCategoryListProps) => {
  return isLoading ? (
    <SkeletonForCalc />
  ) : (
    <HorizontalList
      items={categories}
      disabled={isPending}
      selectedItem={selectedCategory}
      setSelectedItem={setSelectedCategory}
      openModal={openModal}
      handleDelete={handleDelete}
      handleShare={(id) => alert(`not implemented yet ${id}`)}
      handleEdit={(item) => alert(`not implemented yet ${item}`)}
    />
  );
};

export default CategoryList;
