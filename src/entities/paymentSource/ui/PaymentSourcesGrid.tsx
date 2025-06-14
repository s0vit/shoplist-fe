import { Grid } from '@mui/material';
import PaymentSourcesCard from 'src/entities/paymentSource/ui/PaymentSourcesCard.tsx';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type TPaymentSourcesProps = {
  paymentSources: TPaymentSource[];
  handleOpenDeleteDialog: (paymentSource: TPaymentSource) => void;
  onReorder: (reorderedSources: TPaymentSource[], movedId: string, newIndex: number) => void;
};

const PaymentSources = ({ paymentSources, handleOpenDeleteDialog, onReorder }: TPaymentSourcesProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = paymentSources.findIndex((p) => p._id === active.id);
      const newIndex = paymentSources.findIndex((p) => p._id === over?.id);

      const reorderedSources = arrayMove(paymentSources, oldIndex, newIndex).map((p, i) => ({
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
      <SortableContext
        items={paymentSources.map((paymentSource) => paymentSource._id)}
        strategy={verticalListSortingStrategy}
      >
        <Grid container spacing={2}>
          {paymentSources.map((paymentSource) => (
            <PaymentSourcesCard
              key={paymentSource._id}
              paymentSource={paymentSource}
              handleRemove={() => handleOpenDeleteDialog(paymentSource)}
            />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export default PaymentSources;
