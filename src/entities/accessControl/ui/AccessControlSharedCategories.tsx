import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/ui-kit';

import { Icon } from 'src/shared/ui-kit';
import { Box } from 'src/shared/ui-kit';

import CategoryCard from 'src/entities/category/ui/CategoryCard.tsx';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TAccessControl, TCreateAccessControlRequest } from 'src/shared/api/accessControlApi.ts';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('accessControl');

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<Icon name="chevronDown" size="md" />}>
        {t('Shared categories: ')} {accessControl.expenseIds.length}
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
