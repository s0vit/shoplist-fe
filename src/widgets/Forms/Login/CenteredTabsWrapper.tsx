import { styled, Tabs, TabsProps } from '@mui/material';

export const CenteredTabsWrapper = styled(Tabs)<TabsProps>(({ theme }) => ({
  margin: '0 auto',
  backgroundColor: theme.palette.background.default,
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
}));
