import { TCategory, TGetCategoriesResponse } from 'src/shared/api/categoryApi.ts';
import CategoryCard from 'src/entities/category/ui/CategoryCard.tsx';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { Grid } from 'src/shared/ui-kit';

type TCategoriesProps = {
  categories: TGetCategoriesResponse;
  handleOpenDeleteDialog: (paymentSource: TCategory) => void;
  onReorder: (reorderedSources: TPaymentSource[], movedId: string, newIndex: number) => void;
};

const Categories = ({ categories, handleOpenDeleteDialog, onReorder }: TCategoriesProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((p) => p._id === active.id);
      const newIndex = categories.findIndex((p) => p._id === over?.id);

      const reorderedSources = arrayMove(categories, oldIndex, newIndex).map((p, i) => ({
        ...p,
        order: i,
      }));

      onReorder(reorderedSources, active.id as string, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={categories.map((category) => category._id)} strategy={verticalListSortingStrategy}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              handleRemove={() => handleOpenDeleteDialog(category)}
            />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export default Categories;
