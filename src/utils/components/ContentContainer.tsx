import { Box, BoxProps, styled } from '@mui/material';

export const ContentContainer = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));
