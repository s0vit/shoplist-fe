import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, MenuItem, Paper, Select, Stack, Typography, useTheme } from '@mui/material';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import AddCategoryModal from 'src/widgets/Modal/AddCategoryModal/AddCategoryModal.tsx';
import AddPaymentSourceModal from 'src/widgets/Modal/AddPaymantSourceModal/AddPaymentSourceModal.tsx';
import { createExpense, TCreateExpenseInput, TExpense, updateExpense } from 'src/shared/api/expenseApi.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { toast } from 'react-toastify';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { DatePicker } from '@mui/x-date-pickers';
import HorizontalList from 'src/widgets/Forms/AddExpenseForm/HorizontalList.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { deleteCategory } from 'src/shared/api/categoryApi.ts';
import { deletePaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';

type TExpensesCalculatorProps = {
  closeModal?: () => void;
};

const AddExpenseCalculator = ({ closeModal }: TExpensesCalculatorProps) => {
  const paymentSources = usePaymentSourcesStore.use.userPaymentSources();
  const categories = useCategoryStore.use.userCategories();
  const currentExpense = useExpensesStore.use.currentEditExpense?.();
  const theme = useTheme();
  const [amount, setAmount] = useState<string>(currentExpense?.amount.toString() || '0');
  const [currency, setCurrency] = useState<string>('$');
  const [selectedCategory, setSelectedCategory] = useState<string>(currentExpense?.categoryId || '');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState<string>(currentExpense?.paymentSourceId || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    currentExpense?.createdAt ? new Date(currentExpense.createdAt) : new Date(),
  );
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddPaymentSourceModalOpen, setIsAddPaymentSourceModalOpen] = useState(false);

  const { fetchExpenses } = useLoadExpenses();
  const { isDesktopWidth } = useWindowWidth();
  const { fetchCategories } = useLoadCategories(false);
  const { fetchPaymentSources } = useLoadPaymentSources(false);
  const {
    isSuccess: isDeleteCategorySuccess,
    mutate: deleteCategoryMutate,
    isPending: isDeleteCategoryPending,
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: fetchCategories,
  });
  const {
    isSuccess: isDeletePaymentSourceSuccess,
    mutate: deletePaymentSourceMutate,
    isPending: isDeletePaymentSourcePending,
  } = useMutation({
    mutationFn: deletePaymentSource,
    onSuccess: fetchPaymentSources,
  });

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

  const isPending =
    isCreateExpensePending || isUpdateExpensePending || isDeleteCategoryPending || isDeletePaymentSourcePending;
  const isSuccess =
    isCreateExpenseSuccess || isUpdateExpenseSuccess || isDeleteCategorySuccess || isDeletePaymentSourceSuccess;
  const error = createExpenseError || updateExpenseError;

  const calcButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'];

  const handleButtonClick = (value: string) => {
    if (
      ((amount + value).split('.')[1]?.length > 2 ||
        (value === '.' && amount.includes('.')) ||
        (value === '0' && amount === '0')) &&
      value !== '←'
    ) {
      return;
    }

    if (value === '.' && !amount) {
      setAmount('0.');

      return;
    }

    if (value === '←') {
      amount.length > 1 ? setAmount(amount.slice(0, -1)) : setAmount('0');
    } else if (value === 'Clear') {
      setAmount('');
      setSelectedPaymentSource('');
      setSelectedCategory('');
    } else {
      // replace leading zeros but keep zero before dot
      if (amount === '0' && value !== '.') {
        setAmount(value);
      } else {
        setAmount(amount + value);
      }
    }
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
            createdAt: selectedDate!.toISOString(),
          },
        })
      : createExpenseMutate({
          amount: parseFloat(amount),
          categoryId: selectedCategory,
          paymentSourceId: selectedPaymentSource,
          createdAt: selectedDate!.toISOString(),
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
      closeModal?.();
    }
  }, [closeModal, fetchExpenses, isSuccess]);

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        zIndex: 1,
        maxWidth: isDesktopWidth ? '400px' : '100%',
      }}
    >
      <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '8px' }}>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 1,
              fontWeight: 'bold',
              border: `1px solid ${theme.palette.grey[700]}`,
              height: '40px',
              borderRadius: 1,
              width: '75%',
            }}
          >
            {amount}
          </Typography>
          <FormControl>
            <Select
              autoWidth
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as string)}
            >
              <MenuItem value="$">$</MenuItem>
              <MenuItem value="€">€</MenuItem>
              <MenuItem value="₽">₽</MenuItem>
              <MenuItem value="₴">₴</MenuItem>
              <MenuItem value="₺">₺</MenuItem>
              <MenuItem value="£">£</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Grid container gap={1} justifyContent="space-between">
          {calcButtons.map((value) => (
            <Grid key={value} width="calc(33% - 8px)">
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
        <HorizontalList
          items={categories}
          disabled={isPending}
          selectedItem={selectedCategory}
          setSelectedItem={setSelectedCategory}
          openModal={() => setIsAddCategoryModalOpen(true)}
          handleDelete={deleteCategoryMutate}
          handleShare={(id) => alert(`not implemented yet ${id}`)}
          handleEdit={(item) => alert(`not implemented yet ${item}`)}
        />
        <HorizontalList
          items={paymentSources}
          disabled={isPending}
          selectedItem={selectedPaymentSource}
          setSelectedItem={setSelectedPaymentSource}
          openModal={() => setIsAddPaymentSourceModalOpen(true)}
          handleDelete={deletePaymentSourceMutate}
          handleShare={(id) => alert(`not implemented yet ${id}`)}
          handleEdit={(item) => alert(`not implemented yet ${item}`)}
        />
        <DatePicker
          label="Date"
          disableFuture
          value={selectedDate}
          onChange={setSelectedDate}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
            },
            day: {
              sx: { borderRadius: theme.spacing(1) },
            },
          }}
          sx={{
            mt: 2,
            width: '100%',
            '& .MuiInputBase-root': {
              backgroundColor: theme.palette.background.paper,
            },
          }}
        />
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid xs={6} item>
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
          <Grid xs={6} item>
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
        setSelectedCategory={setSelectedCategory}
      />
      <AddPaymentSourceModal
        closePaymentSourcesModal={() => setIsAddPaymentSourceModalOpen(false)}
        isPaymentSourcesModalOpen={isAddPaymentSourceModalOpen}
        setSelectedPaymentSource={setSelectedPaymentSource}
      />
    </Paper>
  );
};

export default AddExpenseCalculator;
