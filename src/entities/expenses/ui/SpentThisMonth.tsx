import { TExpense } from 'src/shared/api/expenseApi.ts';
import { Box, Paper, Typography } from '@mui/material';

type TSpentThisMonthProps = {
  expenses: TExpense[];
};

const SpentThisMonth = ({ expenses }: TSpentThisMonthProps) => {
  return (
    <Paper>
      <Typography variant="h6" textAlign="center">
        Spent this month:
      </Typography>
      <Box textAlign="center">
        <Typography variant="h3" color="primary">
          {expenses.reduce((acc, expense) => {
            return new Date(expense.createdAt).getMonth() === new Date().getMonth()
              ? acc + expense.amount * 100 // multiply and then divide by 100 to avoid floating point errors
              : acc;
          }, 0) / 100}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SpentThisMonth;
