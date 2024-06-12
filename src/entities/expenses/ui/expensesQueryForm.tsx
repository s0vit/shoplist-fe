import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import CategoriesSelect from 'src/widgets/Forms/AddExpenseForm/CategoriesSelect.tsx';
import PaymentSourcesSelect from 'src/widgets/Forms/AddExpenseForm/PaymentSourcesSelect.tsx';
import useDebouncedValue from 'src/shared/hooks/useDebouncedValue.ts';

type TExpenseQueryFormProps = {
  onSubmit: (query: Record<string, string | undefined | Date | number>) => void;
  isLoading: boolean;
};

type TQuery = {
  categoryId: string;
  paymentSourceId: string;
  createdStartDate: string;
  createdEndDate: string;
  amountStart: string;
  amountEnd: string;
  skip: string;
  limit: string;
};

const ExpenseQueryForm = ({ onSubmit, isLoading }: TExpenseQueryFormProps) => {
  //TODO save to store globally to reuse in all places.
  const emptyQuery = {
    categoryId: '',
    paymentSourceId: '',
    createdStartDate: '',
    createdEndDate: '',
    amountStart: '',
    amountEnd: '',
    skip: '',
    limit: '',
  };

  const prevQuery = useRef<TQuery>(emptyQuery);
  const [query, setQuery] = useState<TQuery>(emptyQuery);

  const debouncedQuery = useDebouncedValue(query, 300);
  const handleChange = useStableCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuery({
      ...query,
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

    if (JSON.stringify(formattedQuery) !== JSON.stringify(prevQuery.current) && !isLoadingRef.current) {
      onSubmit(formattedQuery);
      prevQuery.current = debouncedQuery;
    }
  }, [debouncedQuery, onSubmit]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filter</AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CategoriesSelect
                selectedCategoryId={query.categoryId}
                setSelectedCategoryId={(value) => setQuery({ ...query, categoryId: value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PaymentSourcesSelect
                selectedPaymentSourceId={query.paymentSourceId}
                setSelectedPaymentSourceId={(value) => setQuery({ ...query, paymentSourceId: value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="createdStartDate"
                label="Created Start Date"
                type="datetime-local"
                fullWidth
                size="small"
                value={query.createdStartDate}
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
                value={query.createdEndDate}
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
                value={query.amountStart}
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
                value={query.amountEnd}
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
                value={query.skip}
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
                value={query.limit}
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
