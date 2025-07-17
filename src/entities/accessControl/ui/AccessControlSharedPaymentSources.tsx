import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Box from 'src/shared/ui-kit/Box/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentSourcesCard from 'src/entities/paymentSource/ui/PaymentSourcesCard.tsx';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { TAccessControl, TCreateAccessControlRequest } from 'src/shared/api/accessControlApi.ts';
import { useTranslation } from 'react-i18next';

type TAccessControlSharedPaymentSourcesProps = {
  accessControl: TAccessControl;
  paymentSources: TPaymentSource[];
  updateAccessControlMutate: (data: { id: string; data: TCreateAccessControlRequest }) => void;
};

const AccessControlSharedPaymentSources = ({
  accessControl,
  paymentSources,
  updateAccessControlMutate,
}: TAccessControlSharedPaymentSourcesProps) => {
  const { t } = useTranslation('accessControl');

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {t('Shared payment sources: ')} {accessControl.paymentSourceIds.length}
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {paymentSources.map((paymentSource) => (
            <PaymentSourcesCard
              paymentSource={paymentSource}
              key={paymentSource._id}
              handleRemove={() => {
                updateAccessControlMutate({
                  id: accessControl._id,
                  data: {
                    sharedWith: accessControl.sharedWith,
                    categoryIds: accessControl.categoryIds,
                    expenseIds: accessControl.expenseIds,
                    paymentSourceIds: accessControl.paymentSourceIds.filter(
                      (paymentSourceId) => paymentSourceId !== paymentSource._id,
                    ),
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

export default AccessControlSharedPaymentSources;
