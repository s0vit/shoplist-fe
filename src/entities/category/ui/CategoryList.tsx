import { TCategory } from 'src/shared/api/categoryApi';
import SkeletonForCalc from 'src/utils/components/Skeleton.tsx';
import HorizontalList from 'src/widgets/HorizontalList/HorizontalList.tsx';
import { useEffect, useState } from 'react';

type TCategoryListProps = {
  categories: TCategory[];
  isPending: boolean;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  openModal: () => void;
  handleDelete: (id: string) => void;
  isLoading: boolean;
  updateOrder: (data: { _id: string; order: number }) => void;
};

const CategoryList = ({
  categories,
  isPending,
  selectedCategory,
  setSelectedCategory,
  openModal,
  handleDelete,
  isLoading,
  updateOrder,
}: TCategoryListProps) => {
  const [categoriesList, setCategoriesList] = useState(categories);
  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  return isLoading ? (
    <SkeletonForCalc />
  ) : (
    <HorizontalList
      setItems={setCategoriesList}
      updateOrder={updateOrder}
      items={categoriesList}
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
