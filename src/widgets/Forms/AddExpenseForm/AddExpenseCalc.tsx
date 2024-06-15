import { useState } from 'react';
import { Box, Button, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import selectUserCategories from 'src/entities/category/model/selectors/selectUserCategories.ts';
import AddCategoryModal from 'src/widgets/Modal/AddCategoryModal/AddCategoryModal.tsx';
import AddPaymentSourceModal from 'src/widgets/Modal/AddPaymantSourceModal/AddPaymentSourceModal.tsx';
import { AddCircle } from '@mui/icons-material';

const AddExpenseCalculator = () => {
  const paymentSources = usePaymentSourcesStore(selectUserPaymentSources);
  const categories = useCategoryStore(selectUserCategories);
  const theme = useTheme();
  const [amount, setAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState<string>('');
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddPaymentSourceModalOpen, setIsAddPaymentSourceModalOpen] = useState(false);

  const calcButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'];

  const handleButtonClick = (value: string) => {
    if (
      (amount + value).split('.')[1]?.length > 2 ||
      (value === '.' && amount.includes('.')) ||
      (value === '0' && amount === '0')
    )
      return;

    if (value === '←') {
      setAmount(amount.slice(0, -1));
    } else if (value === 'Clear') {
      setAmount('');
      setSelectedPaymentSource('');
      setSelectedCategory('');
    } else {
      // replace leading zeros
      setAmount((amount + value).replace(/^0+/, ''));
    }
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only numbers and 2 decimal places
    if (isNaN(Number(e.target.value)) || e.target.value.split('.')[1]?.length > 2) return;
    // replace leading zeros
    setAmount(e.target.value.replace(/^0+/, ''));
  };

  return (
    <Paper>
      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '8px', backgroundColor: theme.palette.background.paper }}
      >
        <TextField
          //TODO: Add currency formatting when we have backend for that
          variant="outlined"
          value={amount}
          fullWidth
          onChange={handleChangeAmount}
          sx={{ mb: 1 }}
          InputProps={{
            endAdornment: (
              <Typography variant="h6" mr={1}>
                €{' '}
              </Typography>
            ),
          }}
        />
        <Grid container spacing={1}>
          {calcButtons.map((value) => (
            <Grid xs={4} key={value}>
              <Button variant="contained" fullWidth onClick={() => handleButtonClick(value)} sx={{ height: 40 }}>
                {value}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingTop={1}>
          <Typography variant="subtitle2">Category:</Typography>
          <IconButton color="primary" onClick={() => setIsAddCategoryModalOpen(true)}>
            <AddCircle />
          </IconButton>
        </Box>
        <Box paddingY={1} sx={{ overflowX: 'auto', display: 'flex' }}>
          {categories.map((category) => (
            <Button
              key={category._id}
              variant={selectedCategory === category._id ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSelectedCategory(category._id)}
              sx={
                selectedCategory === category._id
                  ? { backgroundColor: category.color, color: theme.palette.getContrastText(category.color || '') }
                  : { borderColor: category.color }
              }
              style={{ marginRight: '8px', flexShrink: 0 }}
            >
              {category.title}
            </Button>
          ))}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingTop={1}>
          <Typography variant="subtitle2">Payment Source:</Typography>
          <IconButton color="primary" onClick={() => setIsAddPaymentSourceModalOpen(true)}>
            <AddCircle />
          </IconButton>
        </Box>
        <Box paddingY={1} sx={{ overflowX: 'auto', display: 'flex' }}>
          {paymentSources.map((payment) => (
            <Button
              key={payment._id}
              variant={selectedPaymentSource === payment._id ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSelectedPaymentSource(payment._id)}
              sx={
                selectedPaymentSource === payment._id
                  ? { backgroundColor: payment.color, color: theme.palette.getContrastText(payment.color || '') }
                  : { borderColor: payment.color }
              }
              style={{ marginRight: '8px', flexShrink: 0 }}
            >
              {payment.title}
            </Button>
          ))}
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid xs={6}>
            <Button variant="contained" color="warning" fullWidth onClick={() => handleButtonClick('Clear')}>
              Clear
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button variant="contained" color="success" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <AddCategoryModal
        closeCategoryModal={() => setIsAddCategoryModalOpen(false)}
        isCategoryModalOpen={isAddCategoryModalOpen}
      />
      <AddPaymentSourceModal
        closePaymentSourcesModal={() => setIsAddPaymentSourceModalOpen(false)}
        isPaymentSourcesModalOpen={isAddPaymentSourceModalOpen}
      />
    </Paper>
  );
};

export default AddExpenseCalculator;
