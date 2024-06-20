import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ChangeEvent, useEffect, useRef } from 'react';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import CategoriesSelect from 'src/widgets/Forms/AddExpenseForm/CategoriesSelect.tsx';
import PaymentSourcesSelect from 'src/widgets/Forms/AddExpenseForm/PaymentSourcesSelect.tsx';
import useDebouncedValue from 'src/shared/hooks/useDebouncedValue.ts';
import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
import selectForSetFilter from 'src/entities/filters/models/selectors/selectForSetFilter.ts';
import selectForFilter from 'src/entities/filters/models/selectors/selectFilter.ts';

type TExpenseQueryFormProps = {
  onSubmit: (query: Record<string, string | undefined | Date | number>) => void;
  isLoading: boolean;
};

const ExpenseQueryForm = ({ onSubmit, isLoading }: TExpenseQueryFormProps) => {
  const setFilter = useFiltersStoreForExpenses(selectForSetFilter);
  const filter = useFiltersStoreForExpenses(selectForFilter);

  const debouncedQuery = useDebouncedValue(filter, 300);
  const handleChange = useStableCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  });

  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

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

    onSubmit(formattedQuery);
  }, [debouncedQuery, onSubmit]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filter</AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CategoriesSelect
                selectedCategoryId={filter.categoryId}
                setSelectedCategoryId={(value) => {
                  setFilter({ ...filter, categoryId: value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaymentSourcesSelect
                selectedPaymentSourceId={filter.paymentSourceId}
                setSelectedPaymentSourceId={(value) => setFilter({ ...filter, paymentSourceId: value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="createdStartDate"
                label="Created Start Date"
                type="datetime-local"
                fullWidth
                size="small"
                value={filter.createdStartDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="createdEndDate"
                label="Created End Date"
                type="datetime-local"
                fullWidth
                size="small"
                value={filter.createdEndDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="amountStart"
                label="Amount Start"
                type="number"
                fullWidth
                size="small"
                value={filter.amountStart}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="amountEnd"
                label="Amount End"
                type="number"
                fullWidth
                size="small"
                value={filter.amountEnd}
                onChange={handleChange}
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
                value={filter.skip}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="limit"
                label="Limit"
                type="number"
                fullWidth
                size="small"
                value={filter.limit}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpenseQueryForm;
