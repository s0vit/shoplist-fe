import { alpha, Box, Card, CardContent, Grid, Stack, Typography, useTheme } from '@mui/material';
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

  const theme = useTheme();
  const { isDesktopWidth } = useWindowWidth();
  const paymentSourceTextColor = theme.palette.text.primary;
  const paymentSourceBackgroundColor = alpha(paymentSource.color || theme.palette.primary.main, 0.05);

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
      <SwipeAction onClick={handleEdit}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height="100%"
          sx={{
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
          }}
        >
          <Edit />
        </Stack>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleRemove}>
        <Stack
          alignItems="center"
          height="100%"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(1),
          }}
        >
          <Delete />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Grid item xs={12} onContextMenu={handleOpenMenu} {...longPressEvents}>
      <SwipeableList type={Type.IOS} fullSwipe style={{ height: 'auto' }}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Card
            sx={{
              backgroundColor: paymentSourceBackgroundColor,
              width: '100%',
              borderRadius: theme.spacing(1),
              border: `1px solid ${paymentSource.color || theme.palette.primary.main}`,
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" component="div" color={paymentSourceTextColor}>
                  {paymentSource.title}
                </Typography>
                <Typography variant="body2" color={paymentSourceTextColor}>
                  Created: {new Date(paymentSource.createdAt).toLocaleDateString()}
                </Typography>
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
