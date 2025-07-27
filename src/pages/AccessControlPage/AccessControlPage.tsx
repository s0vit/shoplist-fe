import AccessControlsList from 'src/entities/accessControl/ui/AccessControlsList.tsx';
import useLoadAccessControls from 'src/entities/accessControl/hooks/useLoadAccessControls.ts';
import { Skeleton } from 'src/shared/ui-kit';
import { Paper, Typography } from 'src/shared/ui-kit';

import { Stack } from 'src/shared/ui-kit';

import styles from './AccessControlPage.module.scss';

const AccessControlPage = () => {
  const { myAccessControls, isCategoriesLoading } = useLoadAccessControls(true);

  if (isCategoriesLoading) {
    return (
      <Stack gap={2} className={styles.centeredStack}>
        <Paper style={{ padding: 16, paddingBottom: 24 }}>
          <Skeleton variant="rectangular" width="100%" height={32} />
        </Paper>
        <Paper style={{ padding: 16, paddingBottom: 24 }}>
          <Stack gap={2} direction="row">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width="calc(100% - 56px)" height={32} />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: 16 }} />
        </Paper>
      </Stack>
    );
  }

  return (
    <>
      <Paper style={{ padding: 16, maxWidth: '600px', margin: 'auto' }}>
        <Typography variant="h3" gutterBottom>
          {myAccessControls.length === 0 ? "You didn't share any expenses yet" : 'Shared expenses'}
        </Typography>
      </Paper>
      <AccessControlsList myAccessControls={myAccessControls} />
    </>
  );
};

export default AccessControlPage;
