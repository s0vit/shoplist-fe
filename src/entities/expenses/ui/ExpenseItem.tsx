import { MouseEvent, TouchEvent, useState } from 'react';
import { alpha, Box, Chip, Menu, MenuItem, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { Delete, Edit, Share } from '@mui/icons-material';
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
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import ShareWithModal from 'src/widgets/Modal/ShareWithModal/ShareWithModal.tsx';
import useLongPress from 'src/utils/hooks/useLongPress.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { useLocation } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';

type TExpenseItemProps = {
  expense: TExpense;
  category?: TCategory;
  paymentSource?: TPaymentSource;
  handleRemove: (id: string) => void;
};

const ExpenseItem = ({ expense, category, paymentSource, handleRemove }: TExpenseItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShareWithModalOpen, setIsShareWithModalOpen] = useState(false);
  const { isDesktopWidth } = useWindowWidth();

  const setCurrentEditExpense = useExpensesStore.use.setCurrentEditExpense();
  const setIsEditExpenseModalOpen = useExpensesStore.use.setIsEditExpenseModalOpen();
  const theme = useTheme();
  const location = useLocation();

  const browserLocale = navigator.language;
  const categoryColor = category?.color || theme.palette.primary.main;
  const paymentSourceColor = paymentSource?.color || theme.palette.primary.main;

  const handleOpenMenu = (event: MouseEvent<HTMLElement> | TouchEvent) => {
    event.preventDefault();
    setAnchorEl(event.target as HTMLElement);
  };

  const longPressEvents = useLongPress(handleOpenMenu, 500);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = useStableCallback(() => {
    setCurrentEditExpense(expense);
    (!isDesktopWidth || location.pathname !== RoutesEnum.ROOT) && setIsEditExpenseModalOpen(true);
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
      <SwipeableList type={Type.IOS} fullSwipe style={{ height: 'auto' }}>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
          <Tooltip title={expense.comments || ''} key={expense._id} placement="top">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                backgroundColor: alpha(categoryColor, 0.05),
                padding: theme.spacing(0.5),
                borderRadius: theme.spacing(1),
                marginBottom: theme.spacing(1),
                width: '100%',
                border: `1px solid ${categoryColor}`,
              }}
            >
              <Box>
                <Typography variant="subtitle2">{category?.title}</Typography>
                <Typography variant="body2">
                  {new Intl.DateTimeFormat(browserLocale, {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(expense.createdAt))}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  label={expense.amount}
                  sx={{
                    backgroundColor: alpha(paymentSourceColor, 0.9),
                    border: `1px solid ${alpha(theme.palette.getContrastText(paymentSourceColor), 0.8)}`,
                    color: theme.palette.getContrastText(paymentSourceColor),
                    fontSize: '1.2rem',
                    padding: theme.spacing(0.5),
                  }}
                />
                <Typography variant="body2" mr={1}>
                  {paymentSource?.title || 'Deleted'}
                </Typography>
              </Box>
            </Stack>
          </Tooltip>
        </SwipeableListItem>
      </SwipeableList>
      <Menu
        variant="selectedMenu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            style: {
              width: '200px',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            },
          },
        }}
      >
        <MenuItem
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
          divider
          onClick={() => {
            setIsShareWithModalOpen(true);
            handleCloseMenu();
          }}
        >
          <Share fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Share with
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
      <ShareWithModal
        expenseIds={[expense._id]}
        isOpen={isShareWithModalOpen}
        onClose={() => setIsShareWithModalOpen(false)}
      />
    </div>
  );
};

export default ExpenseItem;
