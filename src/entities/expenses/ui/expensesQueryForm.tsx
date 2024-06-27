import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ChangeEvent, useEffect } from 'react';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import CategoriesSelect from 'src/entities/category/ui/CategoriesSelect.tsx';
import PaymentSourcesSelect from 'src/entities/paymentSource/ui/PaymentSourcesSelect.tsx';
import useDebouncedValue from 'src/utils/hooks/useDebouncedValue.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import { TGetExpenseQuery } from 'src/shared/api/expenseApi.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';

const ExpenseQueryForm = () => {
  const { fetchExpenses, isExpensesLoading } = useLoadExpenses({ shouldFetchOnLoad: false });

  const test = useStableCallback((value: TGetExpenseQuery | undefined) => {
    fetchExpenses(value);
  });

  const filters = useFiltersStoreForExpenses.use.filter();
  const setFilter = useFiltersStoreForExpenses.use.setFilter();

  const debouncedQuery = useDebouncedValue(filters, 300);
  const handleChange = useStableCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({
      ...filters,
      [name]: value,
    });
  });

  useEffect(() => {
    const formattedQuery = {
      ...debouncedQuery,
      createdStartDate: debouncedQuery?.createdStartDate ? new Date(debouncedQuery.createdStartDate) : undefined,
      createdEndDate: debouncedQuery?.createdEndDate ? new Date(debouncedQuery.createdEndDate) : undefined,
      amountStart: debouncedQuery?.amountStart ? parseFloat(debouncedQuery.amountStart) : undefined,
      amountEnd: debouncedQuery?.amountEnd ? parseFloat(debouncedQuery.amountEnd) : undefined,
      skip: debouncedQuery?.skip ? parseInt(debouncedQuery.skip, 10) : undefined,
      limit: debouncedQuery?.limit ? parseInt(debouncedQuery.limit, 10) : undefined,
    };

    test(formattedQuery);
  }, [debouncedQuery, test]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filter</AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CategoriesSelect
                selectedCategoryId={filters.categoryId}
                setSelectedCategoryId={(value) => setFilter({ ...filters, categoryId: value })}
                isCreateExpensePending={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaymentSourcesSelect
                selectedPaymentSourceId={filters.paymentSourceId}
                setSelectedPaymentSourceId={(value) => setFilter({ ...filters, paymentSourceId: value })}
                isCreateExpensePending={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="createdStartDate"
                label="Created Start Date"
                type="datetime-local"
                fullWidth
                size="small"
                value={filters.createdStartDate}
                onChange={handleChange}
                disabled={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="createdEndDate"
                label="Created End Date"
                type="datetime-local"
                fullWidth
                size="small"
                value={filters.createdEndDate}
                onChange={handleChange}
                disabled={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="amountStart"
                label="Amount Start"
                type="number"
                fullWidth
                size="small"
                value={filters.amountStart}
                onChange={handleChange}
                disabled={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="amountEnd"
                label="Amount End"
                type="number"
                fullWidth
                size="small"
                value={filters.amountEnd}
                onChange={handleChange}
                disabled={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="standard"
                name="skip"
                label="Skip"
                type="number"
                fullWidth
                size="small"
                value={filters.skip}
                onChange={handleChange}
                disabled={isExpensesLoading}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="limit"
                label="Limit"
                type="number"
                fullWidth
                size="small"
                value={filters.limit}
                onChange={handleChange}
                disabled={isExpensesLoading}
              />
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpenseQueryForm;
