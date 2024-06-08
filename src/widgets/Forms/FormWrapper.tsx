import { Paper, PaperProps, styled } from '@mui/material';

export const FormWrapper = styled(Paper)<PaperProps>(({ theme }) => ({
  width: 'fit-content',
  minWidth: '370px',
  margin: 'auto',
  padding: theme.spacing(2),
}));
