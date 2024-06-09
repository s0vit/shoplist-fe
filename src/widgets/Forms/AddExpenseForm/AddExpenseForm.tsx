import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { Form } from 'react-router-dom';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { createExpense, TCreateExpenseInput, TExpense } from 'src/shared/api/expenseApi.ts';
import { toast } from 'react-toastify';
import PaymentSourcesSelect from 'src/widgets/Forms/AddExpenseForm/PaymentSourcesSelect.tsx';
import CategoriesSelect from 'src/widgets/Forms/AddExpenseForm/CategoriesSelect.tsx';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { handleError } from 'src/utils/errorHandler.ts';

const AddExpenseForm = () => {
  //TODO mode to state management
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
  const [comments, setComments] = useState('');
  const [amount, setAmount] = useState(0);

  const {
    isPending: isCreateExpensePending,
    isSuccess: isCreateExpenseSuccess,
    error: createExpenseError,
    mutate: createExpenseMutate,
  } = useMutation<TExpense, TErrorResponse, TCreateExpenseInput>({
    mutationFn: createExpense,
    mutationKey: ['expenses'],
  });

  const addExpense = () => {
    createExpenseMutate({
      amount,
      categoryId: selectedCategory,
      paymentSourceId: selectedPaymentSource,
      comments,
    });
  };

  useEffect(() => {
    if (isCreateExpenseSuccess) {
      setAmount(0);
      setSelectedCategory('');
      setSelectedPaymentSource('');
      setComments('');
      toast('Expense added', { type: 'success' });
    }
  }, [isCreateExpenseSuccess]);

  useEffect(() => {
    if (createExpenseError) {
      handleError(createExpenseError);
    }
  }, [createExpenseError]);

  return (
    <FormWrapper>
      <Form onSubmit={addExpense}>
        <FormGroup>
          <Stack>
            <FormControl>
              <InputLabel size="small">Amount</InputLabel>
              <OutlinedInput size="small" type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
            </FormControl>
            <CategoriesSelect
              selectedCategoryId={selectedCategory}
              setSelectedCategoryId={setSelectedCategory}
              isCreateExpensePending={isCreateExpensePending}
            />
            <PaymentSourcesSelect
              selectedPaymentSourceId={selectedPaymentSource}
              setSelectedPaymentSourceId={setSelectedPaymentSource}
              isCreateExpensePending={isCreateExpensePending}
            />
            <FormControl sx={{ marginTop: 2 }}>
              <InputLabel size="small">Comments</InputLabel>
              <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
            </FormControl>
            <Button type="submit" variant="outlined" disabled={isCreateExpensePending} sx={{ marginTop: 2 }}>
              Add Expense
            </Button>
          </Stack>
        </FormGroup>
      </Form>
    </FormWrapper>
  );
};

export default AddExpenseForm;