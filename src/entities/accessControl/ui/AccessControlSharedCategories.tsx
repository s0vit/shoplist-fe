import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryCard from 'src/entities/category/ui/CategoryCard.tsx';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TAccessControl, TCreateAccessControlRequest } from 'src/shared/api/accessControlApi.ts';

type TAccessControlItemProps = {
  accessControl: TAccessControl;
  categories: TCategory[];
  updateAccessControlMutate: (data: { id: string; data: TCreateAccessControlRequest }) => void;
};

const AccessControlSharedCategories = ({
  accessControl,
  categories,
  updateAccessControlMutate,
}: TAccessControlItemProps) => {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Shared categories: {accessControl.expenseIds.length}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={category._id}
              handleRemove={() => {
                updateAccessControlMutate({
                  id: accessControl._id,
                  data: {
                    sharedWith: accessControl.sharedWith,
                    categoryIds: accessControl.categoryIds.filter((categoryId) => categoryId !== category._id),
                    expenseIds: accessControl.expenseIds,
                    paymentSourceIds: accessControl.paymentSourceIds,
                  },
                });
              }}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccessControlSharedCategories;
