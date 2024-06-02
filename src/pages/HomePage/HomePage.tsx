import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from 'src/shared/api/rootApi';
import {
  Stack,
  Typography,
  Link,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const { data } = useQuery({ queryFn: getExpenses, queryKey: ['expenses'] });
  return (
    <Stack gap={2}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Home Page</Typography>
        <Link component={RouterLink} to={RoutesEnum.Profile}>
          Profile
        </Link>
      </Paper>

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
  );
};
export default HomePage;
