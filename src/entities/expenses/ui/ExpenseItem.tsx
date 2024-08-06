import { MouseEvent, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { alpha, Chip, FormHelperText, Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import 'react-swipeable-list/dist/styles.css';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { Delete, Edit } from '@mui/icons-material';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { currencies } from 'src/shared/constants/currencies.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import useLongPress from 'src/utils/hooks/useLongPress.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import ShareWithModal from 'src/widgets/Modal/ShareWithModal';
import ExpenseItemMenu from './ExpenseItemMenu.tsx';

type TExpenseItemProps = {
  expense: TExpense;
  category?: TCategory;
  paymentSource?: TPaymentSource;
  handleRemove: (id: string) => void;
};

const ExpenseItem = ({ expense, category, paymentSource, handleRemove }: TExpenseItemProps) => {
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [isShareWithModalOpen, setIsShareWithModalOpen] = useState(false);
  const { isDesktopWidth } = useWindowWidth();

  const setCurrentEditExpense = useExpensesStore.use.setCurrentEditExpense();
  const setIsEditExpenseModalOpen = useExpensesStore.use.setIsEditExpenseModalOpen();
  const theme = useTheme();
  const location = useLocation();

  const browserLocale = navigator.language;
  const { showCategoryColours, showSourceColours, showCategoryNames, showSourceNames } =
    useUserSettingsStore.use.config();
  const categoryColor = category?.color || theme.palette.primary.main;
  const paymentSourceColor = paymentSource?.color || theme.palette.primary.main;

  const expenseCurrency = currencies.find((currency) => currency.value === expense.currency)?.label || '';
  const amountWithCurrency = expense.amount + ' ' + expenseCurrency;

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

  const handleEdit = useStableCallback(() => {
    setCurrentEditExpense(expense);

    if (!isDesktopWidth || location.pathname !== RoutesEnum.ROOT) {
      setIsEditExpenseModalOpen(true);
    }
  });

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleEdit}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
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
      <SwipeAction destructive={true} onClick={() => handleRemove(expense._id)}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            padding: theme.spacing(2),
            marginBottom: theme.spacing(1),
            borderRadius: theme.spacing(1),
          }}
        >
          <Delete />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div onContextMenu={handleOpenMenu} {...longPressEvents}>
      <SwipeableList type={Type.IOS} fullSwipe style={{ height: 'auto', cursor: 'pointer', userSelect: 'none' }}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: showCategoryColours ? alpha(categoryColor, 0.05) : 'null',
              padding: theme.spacing(0.5),
              borderRadius: theme.spacing(1),
              marginBottom: theme.spacing(1),
              width: '100%',
              border: `1px solid`,
              borderColor: showCategoryColours ? categoryColor : 'null',
            }}
          >
            <Box>
              {showCategoryNames && <Typography variant="subtitle2">{category?.title}</Typography>}
              <Typography variant="body2">
                {new Intl.DateTimeFormat(browserLocale, {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(expense.createdAt))}
              </Typography>
              {expense.comments && <FormHelperText>{expense.comments}</FormHelperText>}
            </Box>
            <Stack direction="row">
              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  label={amountWithCurrency}
                  sx={{
                    backgroundColor: showSourceColours ? alpha(paymentSourceColor, 0.9) : 'null',
                    border: `1px solid ${alpha(theme.palette.getContrastText(paymentSourceColor), 0.8)}`,
                    color: showSourceColours ? theme.palette.getContrastText(paymentSourceColor) : 'null',
                    fontSize: '1.2rem',
                    padding: theme.spacing(0.5),
                  }}
                />
                {showSourceNames && (
                  <Typography variant="body2" mr={1}>
                    {paymentSource?.title || 'Deleted'}
                  </Typography>
                )}
              </Box>
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
              >
                <FaPencilAlt size={20} color={theme.palette.text.primary} />
              </IconButton>
            </Stack>
          </Stack>
        </SwipeableListItem>
      </SwipeableList>
      <ExpenseItemMenu
        expense={expense}
        handleRemove={handleRemove}
        contextMenuCoordinates={contextMenuCoordinates}
        handleCloseMenu={handleCloseMenu}
        handleEdit={handleEdit}
        setIsShareWithModalOpen={setIsShareWithModalOpen}
      />
      <ShareWithModal
        expenseIds={[expense._id]}
        isOpen={isShareWithModalOpen}
        onClose={() => setIsShareWithModalOpen(false)}
      />
    </div>
  );
};

export default ExpenseItem;
