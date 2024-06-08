import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal/ExpenseModal.tsx';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';
import { getExpenses, TGetExpensesResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';

const HomePage = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { data } = useQuery<TGetExpensesResponse, TErrorResponse>({ queryFn: getExpenses, queryKey: ['expenses'] });

  const closeExpenseModal = useStableCallback(() => {
    setIsExpenseModalOpen(false);
  });

  const openExpenseModal = useStableCallback(() => setIsExpenseModalOpen(true));
  return (
    <>
      <Stack gap={2}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Home Page</Typography>
          <Link component={RouterLink} to={RoutesEnum.PROFILE}>
            Profile
          </Link>
        </Paper>
        <Button onClick={openExpenseModal}>Add Expense</Button>

        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">Expenses</Typography>
        </Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Payment Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((expense) => (
                <Tooltip title={expense.comments} key={expense._id} placement="top">
                  <TableRow key={expense._id}>
                    <TableCell>{expense.createdAt.toLocaleString()}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.categoryId}</TableCell>
                    <TableCell>{expense.paymentSourceId}</TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {isExpenseModalOpen && <ExpenseModal closeModal={closeExpenseModal} />}
    </>
  );
};
export default HomePage;
