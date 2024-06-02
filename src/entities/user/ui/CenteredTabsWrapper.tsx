import { styled, Tabs, TabsProps } from '@mui/material';

export const CenteredTabsWrapper = styled(Tabs)<TabsProps>(({ theme }) => ({
  minWidth: '300px',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));
