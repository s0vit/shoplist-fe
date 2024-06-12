import { Box, Chip, Tooltip, Typography, useTheme } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';

type TExpenseItemProps = {
  expense: TExpense;
  category?: TCategory;
  paymentSource?: TPaymentSource;
  handleRemove: (id: string) => void;
};

const ExpenseItem = ({ expense, category, paymentSource, handleRemove }: TExpenseItemProps) => {
  const [translateX, setTranslateX] = useState(0);
  const theme = useTheme();
  const browserLocale = navigator.language;
  const categoryColor = category?.color || theme.palette.primary.main;
  const paymentSourceColor = paymentSource?.color || theme.palette.primary.main;

  const handlers = useSwipeable({
    onSwiping: (eventData) => setTranslateX(Math.max(-eventData.deltaX, 0)),
    onSwipedLeft: (eventData) => {
      if (eventData.absX > 75) handleRemove(expense._id);
      setTranslateX(0);
    },
    onSwipedRight: () => setTranslateX(0),
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <Tooltip title={expense.comments || ''} key={expense._id} placement="top">
      <Box
        sx={{
          position: 'relative',
          marginBottom: '8px',
        }}
      >
        <Box
          {...handlers}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: categoryColor,
            padding: '8px',
            borderRadius: '16px',
            color: theme.palette.getContrastText(categoryColor),
            transform: `translateX(-${translateX}px)`,
            // transition: 'transform 0s ease-in-out',
            zIndex: 1,
            position: 'relative',
          }}
        >
          <Box>
            <Typography variant="body2">
              {new Date(expense.createdAt).toLocaleDateString(browserLocale, { day: '2-digit', month: '2-digit' })}
            </Typography>
            <Typography variant="caption">{category?.title}</Typography>
          </Box>
          <Chip
            label={expense.amount}
            sx={{
              backgroundColor: paymentSourceColor,
              color: theme.palette.getContrastText(paymentSourceColor),
            }}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            padding: '8px',
            borderRadius: '17px',
            transition: 'right 0.3s ease-in-out',
            zIndex: 0,
          }}
          className="delete-indicator"
        >
          <Delete />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ExpenseItem;
