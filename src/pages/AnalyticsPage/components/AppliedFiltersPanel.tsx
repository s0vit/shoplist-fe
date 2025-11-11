import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Box, Chip, Paper, Typography } from 'src/shared/ui-kit';

type AppliedFiltersPanelProps = {
  chips: string[];
};

const AppliedFiltersPanel = ({ chips }: AppliedFiltersPanelProps) => {
  const { t } = useTranslation('analyticsPage');

  return (
    <AppliedFiltersWrapper>
      <Typography variant="body2" weight="bold">
        {t('appliedFilters.heading')}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap="8px" sx={{ marginTop: '12px' }}>
        {chips.length > 0 ? (
          chips.map((label) => <Chip key={label} label={label} variant="outlined" style={{ cursor: 'default' }} />)
        ) : (
          <Typography variant="body2">{t('appliedFilters.none')}</Typography>
        )}
      </Box>
    </AppliedFiltersWrapper>
  );
};

const AppliedFiltersWrapper = styled(Paper)`
  padding: 16px;
`;

export default AppliedFiltersPanel;
