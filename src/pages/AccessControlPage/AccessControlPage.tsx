import AccessControlsList from 'src/entities/accessControl/ui/AccessControlsList.tsx';
import useLoadAccessControls from 'src/entities/accessControl/hooks/useLoadAccessControls.ts';
import { Paper, Skeleton, Stack, Typography } from '@mui/material';

const AccessControlPage = () => {
  const { myAccessControls, isCategoriesLoading } = useLoadAccessControls(true);

  if (isCategoriesLoading) {
    return (
      <Stack gap={2} maxWidth="600px" m="auto">
        <Paper sx={{ p: 2, pb: 3 }}>
          <Skeleton variant="rectangular" width="100%" height={32} />
        </Paper>
        <Paper sx={{ p: 2, pb: 3 }}>
          <Stack gap={2} direction="row">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width="calc(100% - 56px)" height={32} />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 2 }} />
        </Paper>
      </Stack>
    );
  }

  return (
    <>
      <Paper sx={{ p: 2, maxWidth: '600px', m: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          {myAccessControls.length === 0 ? "You didn't share any expenses yet" : 'Shared expenses'}
        </Typography>
      </Paper>
      <AccessControlsList myAccessControls={myAccessControls} />
    </>
  );
};

export default AccessControlPage;
