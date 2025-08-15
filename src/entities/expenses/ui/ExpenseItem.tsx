import { MouseEvent, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import { Box, Stack, Select, type TOption, Typography, FormHelperText, getContrastColor } from 'src/shared/ui-kit';

import { Chip } from 'src/shared/ui-kit';
import { alpha, useTheme } from 'src/shared/ui-kit';
import { IconButton } from 'src/shared/ui-kit';

import 'react-swipeable-list/dist/styles.css';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { Icon } from 'src/shared/ui-kit';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { CURRENCIES, currencies } from 'src/shared/constants/currencies.ts';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import useLongPress from 'src/utils/hooks/useLongPress.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import ShareWithModal from 'src/widgets/Modal/ShareWithModal';
import ItemMenu from 'src/widgets/ItemMenu/ItemMenu.tsx';
import styles from './ExpenseItem.module.scss';

type TExpenseItemProps = {
  expense: TExpense;
  category?: TCategory;
  paymentSource?: TPaymentSource;
  handleRemove: (id: string) => void;
  currency?: CURRENCIES;
};

const ExpenseItem = ({ expense, category, paymentSource, handleRemove, currency }: TExpenseItemProps) => {
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
  const navigate = useNavigate();

  const browserLocale = navigator.language;
  const { showCategoryColours, showSourceColours, showCategoryNames, showSourceNames } =
    useUserSettingsStore.use.config();
  const categoryColor = category?.color || theme.palette.primary.main;
  const paymentSourceColor = paymentSource?.color || theme.palette.primary.main;

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

  const handleEditClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.stopPropagation();
    }

    handleEdit();
  };

  const _handleSingleExpense = (event: MouseEvent<HTMLElement>) => {
    if ('id' in event.target && event.target.id !== expense._id) return;
    navigate(`/expense/${expense._id}`);
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditClick}>
        <Stack
          className={styles.actionStack}
          style={
            {
              '--action-bg': theme.colors.categoryBlue,
              '--action-color': theme.colors.white,
            } as React.CSSProperties
          }
        >
          <Icon name="pencilSquare" size="md" />
        </Stack>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleRemove(expense._id)}>
        <Stack
          className={styles.actionStack}
          style={
            {
              '--action-bg': theme.colors.error,
              '--action-color': theme.colors.white,
            } as React.CSSProperties
          }
        >
          <Icon name="trash" size="md" />
        </Stack>
      </SwipeAction>
    </TrailingActions>
  );

  const convertAmount = (expense: TExpense, to: CURRENCIES): number => {
    const rate = expense.exchangeRates[to] ?? 1;

    return expense.amount * rate;
  };

  const [localCurrency, setLocalCurrency] = useState<CURRENCIES>(
    currency ?? useExpensesStore.getState().selectedCurrency,
  );

  useEffect(() => {
    if (currency) {
      setLocalCurrency(currency);
    }
  }, [currency]);

  const convertedAmount = convertAmount(expense, localCurrency);
  const localCurrencySymbol = currencies.find((c) => c.value === localCurrency)?.label || localCurrency;
  const displayAmount = `${convertedAmount.toFixed(2)} ${localCurrencySymbol}`;

  const handleCurrencyChange = (value: string) => {
    setLocalCurrency(value as CURRENCIES);
  };

  return (
    <div onContextMenu={handleOpenMenu} {...longPressEvents}>
      <SwipeableList type={Type.IOS} fullSwipe className={styles.swipeList}>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
          className={styles.swipeListItem}
        >
          <Stack
            justify="space-between"
            direction="row"
            className={styles.rootStack}
            id={expense._id}
            onClick={_handleSingleExpense}
            style={
              {
                '--root-bg': showCategoryColours ? alpha(categoryColor, 0.05) : undefined,
                '--root-border': showCategoryColours ? categoryColor : undefined,
              } as React.CSSProperties
            }
          >
            <Box>
              {showCategoryNames && <Typography variant="body2">{category?.title} - </Typography>}
              <Typography variant="body2">
                {new Intl.DateTimeFormat(browserLocale, {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(expense.createdAt))}
              </Typography>
              {expense.comments && <FormHelperText>{expense.comments}</FormHelperText>}
            </Box>
            <Stack direction="row" align="center" gap={1}>
              <Box className={styles.amountBox}>
                <Chip
                  label={displayAmount}
                  style={{
                    backgroundColor: showSourceColours ? alpha(paymentSourceColor, 0.9) : 'transparent',
                    border: `1px solid ${alpha(theme.colors.white, 0.8)}`,
                    color: getContrastColor(showSourceColours ? theme.colors.black : 'var(--color-app-bg)'),
                    fontSize: '1.2rem',
                    padding: theme.spacing(0.5),
                  }}
                />
                <Select
                  options={
                    currencies.map((currency) => ({ value: currency.value, label: currency.value })) as TOption[]
                  }
                  value={localCurrency}
                  onChange={handleCurrencyChange}
                  style={{ minWidth: 90 }}
                  data-test
                />
                {showSourceNames && (
                  <Typography variant="body2" style={{ marginRight: 8 }}>
                    {paymentSource?.title || 'Deleted'}
                  </Typography>
                )}
              </Box>
              <IconButton
                icon="pencilSquare"
                iconSize={20}
                style={{
                  height: 'fit-content',
                  width: 'fit-content',
                  padding: '5px',
                  marginLeft: '5px',
                  border: `1px solid ${theme.palette.text.primary}`,
                }}
                onClick={handleEditClick}
              />
            </Stack>
          </Stack>
        </SwipeableListItem>
      </SwipeableList>
      <ItemMenu
        itemId={expense._id}
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
