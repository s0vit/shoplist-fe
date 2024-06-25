import { ReactNode, useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, MenuItem, Paper, Select, Stack, Typography, useTheme } from '@mui/material';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import UpsertCategoryModal from 'src/entities/category/ui/UpsertCategoryModal.tsx';
import UpsertPaymentSourceModal from 'src/entities/paymentSource/ui/UpsertPaymentSourceModal.tsx';
import { createExpense, TCreateExpenseInput, TExpense, updateExpense } from 'src/shared/api/expenseApi.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { toast } from 'react-toastify';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import { DatePicker } from '@mui/x-date-pickers';
import HorizontalList from 'src/widgets/HorizontalList/HorizontalList.tsx';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import { deleteCategory } from 'src/shared/api/categoryApi.ts';
import { deletePaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import { BsDot } from 'react-icons/bs';
import { FaBackspace } from 'react-icons/fa';

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
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();

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

  const currencies = ['$', '€', '₽', '₴', '₺', '£'];
  const calcButtons: Array<{ title: string; content: ReactNode }> = [
    {
      title: '1',
      content: '1',
    },
    {
      title: '2',
      content: '2',
    },
    {
      title: '3',
      content: '3',
    },
    {
      title: '4',
      content: '4',
    },
    {
      title: '5',
      content: '5',
    },
    {
      title: '6',
      content: '6',
    },
    {
      title: '7',
      content: '7',
    },
    {
      title: '8',
      content: '8',
    },
    {
      title: '9',
      content: '9',
    },
    {
      title: '.',
      content: <BsDot size={26} />,
    },
    {
      title: '0',
      content: '0',
    },
    {
      title: 'del',
      content: <FaBackspace size={28} />,
    },
  ];

  const handleButtonClick = (value: string) => {
    setAmount((prevValue) => {
      if (value === 'del') {
        return prevValue.length === 1 ? '0' : prevValue.slice(0, -1);
      } else if (value === 'Clear') {
        setSelectedPaymentSource('');
        setSelectedCategory('');

        return '0';
      } else if (value !== '.' && prevValue === '0') {
        return value;
      } else if (value === '.' && prevValue.includes('.')) {
        return prevValue;
      } else if (prevValue.split('.')[1]?.length >= 2) {
        return prevValue;
      } else {
        return `${prevValue}${value}`;
      }
    });
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
              fontSize: '20px',
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
              {currencies.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Grid container gap={1} justifyContent="space-between">
          {calcButtons.map((value) => (
            <Grid key={value.title} width="calc(33% - 8px)">
              <Button
                disabled={isPending}
                variant="contained"
                fullWidth
                onClick={() => handleButtonClick(value.title)}
                sx={{ height: 50, fontSize: '24px' }}
              >
                {value.content}
              </Button>
            </Grid>
          ))}
        </Grid>
        <HorizontalList
          items={categories}
          disabled={isPending}
          selectedItem={selectedCategory}
          setSelectedItem={setSelectedCategory}
          openModal={() => setIsCategoryModalOpen(true)}
          handleDelete={deleteCategoryMutate}
          handleShare={(id) => alert(`not implemented yet ${id}`)}
          handleEdit={(item) => alert(`not implemented yet ${item}`)}
        />
        <HorizontalList
          items={paymentSources}
          disabled={isPending}
          selectedItem={selectedPaymentSource}
          setSelectedItem={setSelectedPaymentSource}
          openModal={() => setIsPaymentSourceModalOpen(true)}
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
      <UpsertCategoryModal />
      <UpsertPaymentSourceModal />
    </Paper>
  );
};

export default AddExpenseCalculator;
