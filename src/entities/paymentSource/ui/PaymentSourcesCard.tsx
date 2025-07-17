import { alpha, Card, CardContent, IconButton, Typography, useTheme } from '@mui/material';
import Box from 'src/shared/ui-kit/Box/Box';
import Stack from 'src/shared/ui-kit/Stack/Stack';
import Grid from 'src/shared/ui-kit/Grid/Grid';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { Delete, Edit } from '@mui/icons-material';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import ItemMenu from 'src/widgets/ItemMenu/ItemMenu.tsx';
import ShareWithModal from 'src/widgets/Modal/ShareWithModal.tsx';
import { MouseEvent, useState } from 'react';
import useLongPress from 'src/utils/hooks/useLongPress.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { FaPencilAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './PaymentSourcesCard.module.scss';

type TPaymentSourcesCardProps = {
  paymentSource: TPaymentSource;
  handleRemove: () => void;
};

const PaymentSourcesCard = ({ paymentSource, handleRemove }: TPaymentSourcesCardProps) => {
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [isShareWithModalOpen, setIsShareWithModalOpen] = useState(false);
  const setCurrentEditingPaymentSource = usePaymentSourcesStore.use.setCurrentEditingPaymentSource();
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();
  const { t } = useTranslation('accounts');
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();
  const paymentSourceTextColor = theme.palette.text.primary;
  const paymentSourceBackgroundColor = alpha(paymentSource.color || theme.palette.primary.main, 0.05);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: paymentSource._id,
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLElement && isDesktopWidth) {
      setContextMenuCoordinates(
        contextMenuCoordinates === null ? { mouseX: event.clientX || 0, mouseY: event.clientY } : null,
      );
    }
  };

  const longPressEvents = useLongPress(
    (e) =>
      setContextMenuCoordinates(
        contextMenuCoordinates === null ? { mouseX: e.touches[0].clientX, mouseY: e.touches[0].clientY } : null,
      ),
    400,
  );

  const handleCloseMenu = () => {
    setContextMenuCoordinates(null);
  };

  const handleEdit = () => {
    setCurrentEditingPaymentSource(paymentSource);
    setIsPaymentSourceModalOpen(true);
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={isVerified ? handleEdit : () => {}}>
        <Stack className={styles.actionStack}>
          <Edit />
        </Stack>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={isVerified} onClick={isVerified ? handleRemove : () => {}}>
        <Stack className={styles.actionStack}>
          <Delete />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Grid
      {...attributes}
      {...listeners}
      container
      item={false}
      className={`${styles.gridRoot} ${styles.sortable}`}
      style={
        {
          '--sortable-transition': style.transition,
          '--sortable-transform': style.transform,
        } as React.CSSProperties
      }
      onContextMenu={handleOpenMenu}
      {...longPressEvents}
      ref={setNodeRef}
    >
      <SwipeableList type={Type.IOS} fullSwipe className={styles.swipeList}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Card
            sx={{
              backgroundColor: paymentSourceBackgroundColor,
              width: '100%',
              borderRadius: theme.spacing(1),
              border: `1px solid ${paymentSource.color || theme.palette.primary.main}`,
            }}
          >
            <CardContent sx={{ p: 1 }} className={styles.cardContent}>
              <Box className={styles.flexBetween}>
                <Typography variant="h5" component="div" color={paymentSourceTextColor}>
                  {paymentSource.title}
                </Typography>
                <Box className={styles.flexColumnEnd}>
                  <Typography variant="body2" color={paymentSourceTextColor}>
                    {t('Created: ') + `${new Date(paymentSource.createdAt).toLocaleDateString()}`}
                  </Typography>
                  <IconButton
                    aria-label="edit"
                    sx={{
                      height: 'fit-content',
                      width: 'fit-content',
                      p: '5px',
                      ml: '5px',
                      border: `1px solid ${theme.palette.text.primary}`,
                    }}
                    onClick={handleEdit}
                    disabled={!isVerified}
                  >
                    <FaPencilAlt size={20} color={theme.palette.text.primary} />
                  </IconButton>
                </Box>
              </Box>
              {paymentSource.comments && (
                <Typography variant="body2" color={paymentSourceTextColor}>
                  {paymentSource.comments}
                </Typography>
              )}
            </CardContent>
          </Card>
        </SwipeableListItem>
      </SwipeableList>
      <ItemMenu
        itemId={paymentSource._id}
        handleRemove={handleRemove}
        contextMenuCoordinates={contextMenuCoordinates}
        handleCloseMenu={handleCloseMenu}
        handleEdit={handleEdit}
        setIsShareWithModalOpen={setIsShareWithModalOpen}
      />
      <ShareWithModal
        categoryIds={[paymentSource._id]}
        isOpen={isShareWithModalOpen}
        onClose={() => setIsShareWithModalOpen(false)}
      />
    </Grid>
  );
};

export default PaymentSourcesCard;
