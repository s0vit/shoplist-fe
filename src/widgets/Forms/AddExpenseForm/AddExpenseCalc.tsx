import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import selectUserCategories from 'src/entities/category/model/selectors/selectUserCategories.ts';
import AddCategoryModal from 'src/widgets/Modal/AddCategoryModal/AddCategoryModal.tsx';
import AddPaymentSourceModal from 'src/widgets/Modal/AddPaymantSourceModal/AddPaymentSourceModal.tsx';
import { AddCircle } from '@mui/icons-material';
import { createExpense, TCreateExpenseInput, TExpense, updateExpense } from 'src/shared/api/expenseApi.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { toast } from 'react-toastify';
import selectCurrentEditExpense from 'src/entities/expenses/model/selectors/selectCurrentEditExpense.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import HorizontalList from 'src/widgets/Forms/AddExpenseForm/HorizontalList.tsx';

type TExpensesCalculatorProps = {
  closeModal: () => void;
};

const AddExpenseCalculator = ({ closeModal }: TExpensesCalculatorProps) => {
  const paymentSources = usePaymentSourcesStore(selectUserPaymentSources);
  const categories = useCategoryStore(selectUserCategories);
  const currentExpense = useExpensesStore(selectCurrentEditExpense);
  const theme = useTheme();
  const [amount, setAmount] = useState<string>(currentExpense?.amount.toString() || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(currentExpense?.categoryId || '');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState<string>(currentExpense?.paymentSourceId || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    currentExpense?.createdAt ? new Date(currentExpense.createdAt) : new Date(),
  );
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddPaymentSourceModalOpen, setIsAddPaymentSourceModalOpen] = useState(false);

  const { fetchExpenses } = useLoadExpenses();

  const {
    isPending: isCreateExpensePending,
    isSuccess: isCreateExpenseSuccess,
    error: createExpenseError,
    mutate: createExpenseMutate,
  } = useMutation<TExpense, TErrorResponse, TCreateExpenseInput>({
    mutationFn: createExpense,
    mutationKey: ['expenses'],
  });

  const {
    isPending: isUpdateExpensePending,
    isSuccess: isUpdateExpenseSuccess,
    error: updateExpenseError,
    mutate: updateExpenseMutate,
  } = useMutation<TExpense, TErrorResponse, { id: string; data: TCreateExpenseInput }>({
    mutationFn: ({ id, data }) => updateExpense(id, data),
    mutationKey: ['expenses'],
  });

  const isPending = isCreateExpensePending || isUpdateExpensePending;
  const isSuccess = isCreateExpenseSuccess || isUpdateExpenseSuccess;
  const error = createExpenseError || updateExpenseError;

  const calcButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'];

  const handleButtonClick = (value: string) => {
    if (
      (amount + value).split('.')[1]?.length > 2 ||
      (value === '.' && amount.includes('.')) ||
      (value === '0' && amount === '0')
    )
      return;

    if (value === '←') {
      setAmount(amount.slice(0, -1));
    } else if (value === 'Clear') {
      setAmount('');
      setSelectedPaymentSource('');
      setSelectedCategory('');
    } else {
      // replace leading zeros
      setAmount((amount + value).replace(/^0+/, ''));
    }
  };

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    // only numbers and 2 decimal places
    if (isNaN(Number(e.target.value)) || e.target.value.split('.')[1]?.length > 2) return;
    // replace leading zeros
    setAmount(e.target.value.replace(/^0+/, ''));
  };

  const handleSave = () => {
    if (!amount || !selectedCategory || !selectedPaymentSource) return;
    currentExpense?._id
      ? updateExpenseMutate({
          id: currentExpense._id,
          data: {
            amount: parseFloat(amount),
            categoryId: selectedCategory,
            paymentSourceId: selectedPaymentSource,
            createdAt: selectedDate!, // it's update function so createdAt is already set
          },
        })
      : createExpenseMutate({
          amount: parseFloat(amount),
          categoryId: selectedCategory,
          paymentSourceId: selectedPaymentSource,
          createdAt: selectedDate || new Date(),
        });
  };

  useEffect(() => {
    if (isSuccess) {
      fetchExpenses();
      toast('Expense added successfully', { type: 'success' });
      setAmount('');
      setSelectedPaymentSource('');
      setSelectedCategory('');
      setSelectedDate(new Date());
      closeModal();
    }
  }, [closeModal, fetchExpenses, isSuccess]);

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  return (
    <Paper sx={{ backgroundColor: theme.palette.background.paper, position: 'relative', zIndex: 1 }}>
      <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '8px' }}>
        <TextField
          disabled={isPending}
          variant="outlined"
          value={amount}
          fullWidth
          sx={{ mb: 1 }}
          onChange={handleChangeAmount}
          InputProps={{
            endAdornment: (
              <Typography variant="h6" mr={1}>
                €{' '}
              </Typography>
            ),
          }}
        />
        <Grid container spacing={1}>
          {calcButtons.map((value) => (
            <Grid xs={4} key={value}>
              <Button
                disabled={isPending}
                variant="contained"
                fullWidth
                onClick={() => handleButtonClick(value)}
                sx={{ height: 40 }}
              >
                {value}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingTop={1}>
          <Typography variant="subtitle2">Category:</Typography>
          <IconButton disabled={isPending} color="primary" onClick={() => setIsAddCategoryModalOpen(true)}>
            <AddCircle />
          </IconButton>
        </Box>
        <HorizontalList
          items={categories}
          disabled={isPending}
          selectedItem={selectedCategory}
          setSelectedItem={setSelectedCategory}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingTop={1}>
          <Typography variant="subtitle2">Payment Source:</Typography>
          <IconButton disabled={isPending} color="primary" onClick={() => setIsAddPaymentSourceModalOpen(true)}>
            <AddCircle />
          </IconButton>
        </Box>
        <HorizontalList
          items={paymentSources}
          disabled={isPending}
          selectedItem={selectedPaymentSource}
          setSelectedItem={setSelectedPaymentSource}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date"
            disableFuture
            value={selectedDate}
            onChange={setSelectedDate}
            sx={{
              mt: -1, // to align with other fields
              width: '100%',
              '& .MuiInputBase-root': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
        </LocalizationProvider>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid xs={6}>
            <Button
              disabled={isPending}
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => handleButtonClick('Clear')}
            >
              Clear
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button
              disabled={isPending || !amount || !selectedCategory || !selectedPaymentSource}
              variant="contained"
              color="success"
              fullWidth
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <AddCategoryModal
        closeCategoryModal={() => setIsAddCategoryModalOpen(false)}
        isCategoryModalOpen={isAddCategoryModalOpen}
      />
      <AddPaymentSourceModal
        closePaymentSourcesModal={() => setIsAddPaymentSourceModalOpen(false)}
        isPaymentSourcesModalOpen={isAddPaymentSourceModalOpen}
      />
    </Paper>
  );
};

export default AddExpenseCalculator;
