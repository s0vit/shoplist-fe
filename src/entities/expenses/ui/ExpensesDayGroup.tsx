import { FormControl, MenuItem, Paper, Select, Typography } from '@mui/material';
import Box from 'src/shared/ui-kit/Box/Box';
import Stack from 'src/shared/ui-kit/Stack/Stack';
import { UseMutateFunction } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import ExpenseItem from 'src/entities/expenses/ui/ExpenseItem.tsx';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import { currencies, CURRENCIES } from 'src/shared/constants/currencies';
import calculateTotalAmount from 'src/utils/helpers/calculateTotalAmmount';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import styles from './ExpensesDayGroup.module.scss';

type TExpensesDayGroupProps = {
  date: string;
  expenses: TExpense[];
  deleteExpense: UseMutateFunction<TExpense, Error, string, unknown>;
};

const ExpensesDayGroup = ({ date, expenses, deleteExpense }: TExpensesDayGroupProps) => {
  const defaultCurrency = useUserSettingsStore.use.config().currency;
  const [currency, setCurrency] = useState<CURRENCIES>(defaultCurrency ?? CURRENCIES.EUR);
  const userCategories = useCategoryStore.use.userCategories();
  const userPaymentSources = usePaymentSourcesStore(selectUserPaymentSources);

  return (
    <Paper key={date} sx={{ mb: 2, p: 2 }}>
      <Box className={styles.headerBox}>
        <Typography variant="h6" gutterBottom>
          {format(new Date(date), 'MM/dd')}
        </Typography>
        <Stack direction="row" gap={1}>
          <Typography variant="h6" gutterBottom>
            {calculateTotalAmount(expenses, currency || CURRENCIES.EUR)}
          </Typography>
          <FormControl>
            <Select
              autoWidth
              variant="standard"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CURRENCIES)}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.value} value={currency.value}>
                  {currency.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      {expenses.map((expense) => {
        const category = userCategories.find((category) => category._id === expense.categoryId);
        const paymentSource = userPaymentSources.find((source) => source._id === expense.paymentSourceId);

        return (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            category={category}
            paymentSource={paymentSource}
            handleRemove={deleteExpense}
            currency={currency}
          />
        );
      })}
    </Paper>
  );
};

export default ExpensesDayGroup;
