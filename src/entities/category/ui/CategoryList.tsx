import { TCategory } from 'src/shared/api/categoryApi';
import HorizontalList from 'src/widgets/HorizontalList/HorizontalList.tsx';
import SkeletonGroup from 'src/utils/components/Skeleton.tsx';

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
    <SkeletonGroup
      dimensions={{ direction: 'row', width: 85, height: 36 }}
      styles={{ marginTop: '10px', marginLeft: '10px', borderRadius: 'var(--border-radius-lg)' }}
    />
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
