import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Box } from 'src/shared/ui-kit';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoriesSelect from 'src/entities/category/ui/CategoriesSelect.tsx';
import PaymentSourcesSelect from 'src/entities/paymentSource/ui/PaymentSourcesSelect.tsx';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';
import { useTranslation } from 'react-i18next';
import useLoadExpenses from 'src/entities/expenses/hooks/useLoadExpenses.ts';

const ExpenseQueryForm = () => {
  const { isExpensesLoading } = useLoadExpenses();
  const filters = useFiltersStoreForExpenses.use.filter();
  const setFilter = useFiltersStoreForExpenses.use.setFilter();
  const { t } = useTranslation('homePage');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({
      ...filters,
      [name as keyof TFilterForQueryTypes]: value,
    });
  };

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
            <Grid item size={{ xs: 12, sm: 4 }}>
              <CategoriesSelect
                selectedCategoryId={filters.categoryId}
                setSelectedCategoryId={(value) => setFilter({ ...filters, categoryId: value })}
                isCreateExpensePending={isExpensesLoading}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <PaymentSourcesSelect
                selectedPaymentSourceId={filters.paymentSourceId}
                setSelectedPaymentSourceId={(value) => setFilter({ ...filters, paymentSourceId: value })}
                isCreateExpensePending={isExpensesLoading}
              />
            </Grid>
            {filtersArray.map((field) => (
              <Grid item size={{ xs: 12, sm: 4 }} key={field.name}>
                <TextField
                  name={field.name}
                  label={t(field.label)}
                  type={field.type}
                  fullWidth
                  size="small"
                  value={filters[field.name as keyof TFilterForQueryTypes] || ''}
                  onChange={handleChange}
                  disabled={isExpensesLoading}
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
