import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Chip,
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
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import ExpenseModal from 'src/widgets/Modal/ExpenseModal/ExpenseModal.tsx';
import { useStableCallback } from 'src/utils/hooks/useStableCallback.ts';
import { getExpenses, TGetExpensesResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';

const HomePage = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { data } = useQuery<TGetExpensesResponse, TErrorResponse>({ queryFn: getExpenses, queryKey: ['expenses'] });
  const { userPaymentSources } = useLoadPaymentSources();
  const { userCategories } = useLoadCategories();
  const theme = useTheme();

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
                    <TableCell>{new Date(expense.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={userCategories.find((category) => category._id === expense.categoryId)?.title}
                        color="primary"
                        sx={{
                          backgroundColor:
                            userCategories.find((category) => category._id === expense.categoryId)?.color ||
                            theme.palette.primary.main,
                          color: theme.palette.getContrastText(
                            userCategories.find((category) => category._id === expense.categoryId)?.color ||
                              theme.palette.primary.main,
                          ),
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={userPaymentSources.find((source) => source._id === expense.paymentSourceId)?.title}
                        color="primary"
                        sx={{
                          backgroundColor:
                            userPaymentSources.find((source) => source._id === expense.paymentSourceId)?.color ||
                            theme.palette.primary.main,
                          color: theme.palette.getContrastText(
                            userPaymentSources.find((source) => source._id === expense.paymentSourceId)?.color ||
                              theme.palette.primary.main,
                          ),
                        }}
                      />
                    </TableCell>
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
