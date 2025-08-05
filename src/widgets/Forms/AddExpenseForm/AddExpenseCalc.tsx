import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  Paper,
  Select,
  Stack,
  Typography,
} from 'src/shared/ui-kit';

import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
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
import errorHandler from 'src/utils/errorHandler.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import UpsertCategoryModal from 'src/widgets/Modal/UpsertCategoryModal';
import UpsertPaymentSourceModal from 'src/widgets/Modal/UpsertPaymentSourceModal';
import CategoryList from '../../../entities/category/ui/CategoryList';
import PaymentSourceList from '../../../entities/paymentSource/ui/PaymentSourceList';
import CommentModal from '../../Modal/CommentModal';
import CalculatorButtons from './CalculatorButtons';
import useUserSettingsStore from 'src/entities/userSettings/model/store/useUserSettingsStore.ts';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';

import styles from './AddExpenseCalc.module.scss';

type TExpensesCalculatorProps = {
  closeModal?: () => void;
};

const AddExpenseCalculator = ({ closeModal }: TExpensesCalculatorProps) => {
  const paymentSources = usePaymentSourcesStore.use.userPaymentSources();
  const categories = useCategoryStore.use.userCategories();
  const currentExpense = useExpensesStore.use.currentEditExpense?.();
  const setCurrentEditExpense = useExpensesStore.use.setCurrentEditExpense?.();

  const defaultCurrency = useUserSettingsStore.use.config().currency;
  const [amount, setAmount] = useState<string>('0');
  const [currency, setCurrency] = useState<CURRENCIES>(defaultCurrency ?? CURRENCIES.EUR);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false); // TODO move to store
  const [comments, setComments] = useState<string>('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const setIsCategoryModalOpen = useCategoryStore.use.setIsCategoryModalOpen();
  const setIsPaymentSourceModalOpen = usePaymentSourcesStore.use.setIsPaymentSourceModalOpen();
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const { t } = useTranslation('homePage');

  const { fetchExpenses } = useLoadExpenses();
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

  const onCalendarClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (dateInputRef.current) {
      try {
        if ('showPicker' in dateInputRef.current) {
          dateInputRef.current.showPicker();
        }
      } catch (_error: unknown) {
        errorHandler(_error, false);
      }
    }
  };

  return (
    <>
      <Paper className={styles.wrapper}>
        <Box className={`${styles.rootBox} ${styles.borderBox}`}>
          <Stack direction="row" gap={2} align="center" justify="space-between" className={styles.topRow}>
            <Typography className={styles.amountText}>{amount}</Typography>
            <FormControl className={styles.currencySelect}>
              <Select options={currencies} value={currency} onChange={(value) => setCurrency(value as CURRENCIES)} />
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
          <div className={styles.dateCommentRow}>
            <div className={styles.calendarWrapper}>
              <IconButton
                className={styles.dateButton}
                icon="calendar"
                iconVariant="secondary"
                iconSize="sm"
                onClick={onCalendarClick}
              />
              <input
                type="datetime-local"
                className={styles.dateInput}
                ref={dateInputRef}
                value={selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedDate(value ? new Date(value) : undefined);
                }}
              />
            </div>
            <Input
              className={styles.commentInput}
              width="100%"
              onChange={(e) => setComments(e.target.value)}
              value={comments}
              placeholder={t('Comment')}
            />
          </div>
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

      <div className={styles.buttonsWrapper}>
        <ButtonGroup fullWidth height="53px">
          <Button disabled={isPending} variant="outlined" label={t('Clear')} onClick={clearData} />
          <Button
            disabled={isPending || !isVerified}
            variant="contained"
            label={isPending ? <CircularProgress size={24} /> : t('Save')}
            onClick={handleSave}
          />
        </ButtonGroup>
      </div>
    </>
  );
};

export default AddExpenseCalculator;
