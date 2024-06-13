import { styled, Tabs, TabsProps } from '@mui/material';

const CenteredTabsWrapper = styled(Tabs)<TabsProps>(({ theme }) => ({
  margin: '0 auto',
  backgroundColor: theme.palette.background.default,
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
  },
}));

export default CenteredTabsWrapper;
