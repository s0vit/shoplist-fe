import { MouseEvent, useState } from 'react';
import { alpha, Box, Chip, Menu, MenuItem, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { Delete, Edit } from '@mui/icons-material';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import selectSetCurrentEditExpense from 'src/entities/expenses/model/selectors/selectSetCurrentEditExpense.ts';
import selectSetIsExpenseModalOpen from 'src/entities/expenses/model/selectors/selectSetIsExpenseModalOpen.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';

type TExpenseItemProps = {
  expense: TExpense;
  category?: TCategory;
  paymentSource?: TPaymentSource;
  handleRemove: (id: string) => void;
};

const ExpenseItem = ({ expense, category, paymentSource, handleRemove }: TExpenseItemProps) => {
  const setCurrentEditExpense = useExpensesStore(selectSetCurrentEditExpense);
  const setIsEditExpenseModalOpen = useExpensesStore(selectSetIsExpenseModalOpen);
  const theme = useTheme();

  const browserLocale = navigator.language;
  const categoryColor = category?.color || theme.palette.primary.main;
  const paymentSourceColor = paymentSource?.color || theme.palette.primary.main;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault(); // предотвратить контекстное меню браузера
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = useStableCallback(() => {
    setCurrentEditExpense(expense);
    setIsEditExpenseModalOpen(true);
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
    <>
      <SwipeableList type={Type.IOS} fullSwipe>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Tooltip title={expense.comments || ''} key={expense._id} placement="top">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onContextMenu={handleOpenMenu}
              sx={{
                backgroundColor: alpha(categoryColor, 0.7),
                padding: theme.spacing(1),
                borderRadius: theme.spacing(1),
                color: theme.palette.getContrastText(categoryColor),
                marginBottom: theme.spacing(1),
                width: '100%',
                border: `1px solid ${categoryColor}`,
              }}
            >
              <Box>
                <Typography variant="body1">
                  {new Date(expense.createdAt).toLocaleDateString(browserLocale, { day: '2-digit', month: '2-digit' })}
                </Typography>
                <Typography variant="subtitle2">{category?.title}</Typography>
              </Box>
              <Tooltip title={paymentSource?.title || ''}>
                <Chip
                  label={expense.amount}
                  sx={{
                    backgroundColor: paymentSourceColor,
                    border: `1px solid ${alpha(theme.palette.getContrastText(paymentSourceColor), 0.3)}`,
                    color: theme.palette.getContrastText(paymentSourceColor),
                    fontSize: '1.2rem',
                    padding: theme.spacing(0.5),
                  }}
                />
              </Tooltip>
            </Stack>
          </Tooltip>
        </SwipeableListItem>
      </SwipeableList>
      <Menu
        variant="selectedMenu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            width: '200px',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }}
      >
        <MenuItem
          divider
          onClick={() => {
            handleEdit();
            handleCloseMenu();
          }}
        >
          <Edit fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleRemove(expense._id);
            handleCloseMenu();
          }}
        >
          <Delete fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExpenseItem;
