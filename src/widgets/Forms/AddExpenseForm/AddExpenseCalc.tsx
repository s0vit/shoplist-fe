import { MapsUgc, Message } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from 'src/shared/ui-kit/Box/Box';
import Stack from 'src/shared/ui-kit/Stack/Stack';
import { FormControl, IconButton, MenuItem, Paper, Select, Typography, useTheme } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import useLoadPaymentSources from 'src/entities/paymentSource/hooks/useLoadPaymentSources.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import { deleteCategory } from 'src/shared/api/categoryApi.ts';
import { createExpense, TCreateExpenseInput, TExpense, updateExpense } from 'src/shared/api/expenseApi.ts';
import { deletePaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { CURRENCIES, currencies } from 'src/shared/constants/currencies.ts';
import handleError from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useWindowWidth from 'src/utils/hooks/useWindowWidth.ts';
import UpsertCategoryModal from 'src/widgets/Modal/UpsertCategoryModal';
import UpsertPaymentSourceModal from 'src/widgets/Modal/UpsertPaymentSourceModal';
import CategoryList from '../../../entities/category/ui/CategoryList';
import PaymentSourceList from '../../../entities/paymentSource/ui/PaymentSourceList';
import CommentModal from '../../Modal/CommentModal';
import CalculatorButtons from './CalculatorButtons';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import Button from 'src/shared/ui-kit/Button/Button';
import styles from './AddExpenseCalc.module.scss';
import ButtonGroup from 'src/shared/ui-kit/ButtonGroup/ButtonGroup';

type TExpensesCalculatorProps = {
  closeModal?: () => void;
};

const AddExpenseCalculator = ({ closeModal }: TExpensesCalculatorProps) => {
  const paymentSources = usePaymentSourcesStore.use.userPaymentSources();
  const categories = useCategoryStore.use.userCategories();
  const currentExpense = useExpensesStore.use.currentEditExpense?.();
  const setCurrentEditExpense = useExpensesStore.use.setCurrentEditExpense?.();
  const theme = useTheme();
  const defaultCurrency = useUserSettingsStore.use.config().currency;
  const [amount, setAmount] = useState<string>('0');
  const [currency, setCurrency] = useState<CURRENCIES>(defaultCurrency ?? CURRENCIES.EUR);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false); // TODO move to store
  const [comments, setComments] = useState<string>('');
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const { t } = useTranslation('homePage');

  const { fetchExpenses } = useLoadExpenses();
  const { isDesktopWidth } = useWindowWidth();
  const { fetchCategories, isCategoriesLoading } = useLoadCategories(false);
  const { fetchPaymentSources, isPaymentSourcesLoading } = useLoadPaymentSources(false);
  const clearData = useStableCallback(() => {
    setAmount('0');
    setSelectedPaymentSource('');
    setSelectedCategory('');
    setSelectedDate(new Date());
    setComments('');
    setCurrentEditExpense?.(undefined);
  });
  const handleSuccess = useStableCallback((text: string, callback: () => void) => {
    callback();
    toast(text, { type: 'success' });
    clearData();
    closeModal?.();
  });

  const { mutate: deleteCategoryMutate, isPending: isDeleteCategoryPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => handleSuccess('Category deleted successfully', fetchCategories),
    onError: (error) => {
      handleError(error);
    },
  });
  const { mutate: deletePaymentSourceMutate, isPending: isDeletePaymentSourcePending } = useMutation({
    mutationFn: deletePaymentSource,
    onSuccess: () => handleSuccess('Payment source deleted successfully', fetchPaymentSources),
    onError: (error) => {
      handleError(error);
    },
  });

  const { isPending: isCreateExpensePending, mutate: createExpenseMutate } = useMutation<
    TExpense,
    TErrorResponse,
    TCreateExpenseInput
  >({
    mutationFn: createExpense,
    onSuccess: () => handleSuccess('Expense added successfully', fetchExpenses),
    onError: (error) => {
      handleError(error);
    },
  });

  const { isPending: isUpdateExpensePending, mutate: updateExpenseMutate } = useMutation<
    TExpense,
    TErrorResponse,
    { id: string; data: TCreateExpenseInput }
  >({
    mutationFn: ({ id, data }) => updateExpense(id, data),
    onSuccess: () => handleSuccess('Expense updated successfully', fetchExpenses),
    onError: (error) => {
      handleError(error);
    },
  });

  const isPending =
    isCreateExpensePending || isUpdateExpensePending || isDeleteCategoryPending || isDeletePaymentSourcePending;

  const handleButtonClick = (value: string) => {
    setAmount((prevValue) => {
      if (value === 'del') {
        return prevValue.length === 1 ? '0' : prevValue.slice(0, -1);
      } else if (value === 'Clear') {
        setSelectedPaymentSource('');
        setSelectedCategory('');
        setCurrentEditExpense?.(undefined);

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

  const handleKeyboard = useStableCallback((e: KeyboardEvent) => {
    const key = e.key;

    switch (key) {
      case 'Enter':
        handleSave();
        break;
      case 'Backspace':
        handleButtonClick('del');
        break;
      case 'Escape':
        handleButtonClick('Clear');
        break;
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        handleButtonClick(key);
        break;
      default:
        break;
    }

    e.preventDefault();
  });

  const handleSave = () => {
    if (!selectedCategory || !selectedPaymentSource || amount === '0') {
      const errorMessage = [];

      if (!selectedCategory) {
        errorMessage.push('Category is required');
      }

      if (!selectedPaymentSource) {
        errorMessage.push('Payment source is required');
      }

      if (amount === '0') {
        errorMessage.push('Amount can not be 0');
      }

      toast(errorMessage.join(', '), { type: 'error' });

      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      categoryId: selectedCategory,
      paymentSourceId: selectedPaymentSource,
      currency: currency,
      createdAt: selectedDate!.toISOString(),
      comments,
    };

    if (currentExpense?._id) {
      updateExpenseMutate({
        id: currentExpense._id,
        data: expenseData,
      });
    } else {
      createExpenseMutate(expenseData);
    }
  };

  useEffect(() => {
    if (currentExpense) {
      setAmount(currentExpense.amount.toString());
      setSelectedCategory(currentExpense.categoryId);
      setSelectedPaymentSource(currentExpense.paymentSourceId);
      setSelectedDate(new Date(currentExpense.createdAt));
      setComments(currentExpense.comments || '');
    } else {
      clearData();
    }
  }, [clearData, currentExpense]);

  useEffect(() => {
    // TODO uncomment when we have a way to handle the modal state
    // document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <Paper
      style={{
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        zIndex: 1,
        maxWidth: isDesktopWidth ? '400px' : '100%',
      }}
    >
      <Box className={`${styles.rootBox} ${styles.borderBox}`}>
        <Stack direction="row" gap={1} align="center" justify="space-between" className={styles.topRow}>
          <Typography
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
              paddingRight: 8,
              fontSize: 20,
              fontWeight: 'bold',
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
        <CalculatorButtons isPending={isPending} handleButtonClick={handleButtonClick} />
        <CategoryList
          categories={categories}
          isPending={isPending}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          openModal={() => setIsCategoryModalOpen(true)}
          handleDelete={deleteCategoryMutate}
          isLoading={isCategoriesLoading}
        />
        <PaymentSourceList
          paymentSources={paymentSources}
          isPending={isPending}
          selectedPaymentSource={selectedPaymentSource}
          setSelectedPaymentSource={setSelectedPaymentSource}
          openModal={() => setIsPaymentSourceModalOpen(true)}
          handleDelete={deletePaymentSourceMutate}
          isLoading={isPaymentSourcesLoading}
        />
        <Stack direction="row" gap={1} align="center" className={styles.dateRow}>
          <DateTimePicker
            label={t('Date and time')}
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
              width: '100%',
              '& .MuiInputBase-root': {
                backgroundColor: theme.palette.background.paper,
              },
              '& .MuiInputBase-input': {
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
              },
            }}
          />
          <IconButton
            onClick={() => setIsCommentModalOpen(true)}
            sx={{ border: `1px solid ${comments ? theme.palette.success.main : theme.palette.grey[700]}` }}
          >
            {comments?.length ? (
              <Message htmlColor={theme.palette.success.main} sx={{ width: '21px', height: '21px' }} />
            ) : (
              <MapsUgc sx={{ width: '21px', height: '21px' }} />
            )}
          </IconButton>
        </Stack>
        <ButtonGroup fullWidth>
          <Button
            disabled={isPending}
            variant="contained"
            label={t('Clear')}
            onClick={() => handleButtonClick('Clear')}
          />
          <Button
            disabled={isPending || !isVerified}
            variant="contained"
            label={isPending ? <CircularProgress size={24} /> : t('Save')}
            onClick={handleSave}
          />
        </ButtonGroup>
      </Box>
      <UpsertCategoryModal setSelectedCategory={setSelectedCategory} />
      <UpsertPaymentSourceModal setSelectedPaymentSource={setSelectedPaymentSource} />
      <CommentModal
        isCommentModalOpen={isCommentModalOpen}
        setIsCommentModalOpen={setIsCommentModalOpen}
        comment={comments}
        setComment={setComments}
      />
    </Paper>
  );
};

export default AddExpenseCalculator;
