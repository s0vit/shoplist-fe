import { useTranslation } from 'react-i18next';

import { Paper, Typography } from 'src/shared/ui-kit';

const EmptyStateCard = () => {
  const { t } = useTranslation('analyticsPage');

  return (
    <Paper>
      <Typography variant="h3">{t('emptyState.title')}</Typography>
      <Typography variant="body2" color="secondary" style={{ marginTop: '8px' }}>
        <p>{t('emptyState.description')}</p>
      </Typography>
    </Paper>
  );
};

export default EmptyStateCard;
