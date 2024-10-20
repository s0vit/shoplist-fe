import { ChangeEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoriesSelect from 'src/entities/category/ui/CategoriesSelect.tsx';
import PaymentSourcesSelect from 'src/entities/paymentSource/ui/PaymentSourcesSelect.tsx';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useDebouncedValue from 'src/utils/hooks/useDebouncedValue.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import { TGetExpenseQuery } from 'src/shared/api/expenseApi.ts';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';
import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';
import { useTranslation } from 'react-i18next';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';

const ExpenseQueryForm = () => {
  const isVerified = _useUserStore.use.user?.()?.isVerified;
  const { fetchExpenses, isExpensesLoading } = useLoadExpenses({ shouldFetchOnLoad: false });
  const filters = useFiltersStoreForExpenses.use.filter();
  const setFilter = useFiltersStoreForExpenses.use.setFilter();
  const debouncedQuery = useDebouncedValue(filters, 300);
  const { t } = useTranslation('homePage');

  const handleFetchExpenses = useStableCallback((value: TGetExpenseQuery | undefined) => {
    fetchExpenses(value);
  });

  const handleChange = useStableCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({
      ...filters,
      [name as keyof TFilterForQueryTypes]: value,
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

    if (isVerified) {
      handleFetchExpenses(formattedQuery);
    }
  }, [debouncedQuery, handleFetchExpenses, isVerified]);

  const filtersArray = [
    { name: 'createdStartDate', label: 'Created Start Date', type: 'datetime-local' },
    { name: 'createdEndDate', label: 'Created End Date', type: 'datetime-local' },
    { name: 'amountStart', label: 'Amount Start', type: 'number' },
    { name: 'amountEnd', label: 'Amount End', type: 'number' },
    { name: 'skip', label: 'Skip', type: 'number' },
    { name: 'limit', label: 'Limit', type: 'number' },
  ];

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{t('Filter')}</AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container spacing={2}>
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
            {filtersArray.map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                <TextField
                  name={field.name}
                  label={t(field.label)}
                  type={field.type}
                  fullWidth
                  size="small"
                  value={filters[field.name as keyof TFilterForQueryTypes] || ''}
                  onChange={handleChange}
                  disabled={isExpensesLoading}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpenseQueryForm;
