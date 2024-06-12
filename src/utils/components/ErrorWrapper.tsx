import { Container, ContainerProps, styled } from '@mui/material';

const ErrorWrapper = styled(Container)<ContainerProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  padding: 3,
}));

export default ErrorWrapper;
