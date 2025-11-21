import styled from 'styled-components';

import { CircularProgress, Paper, Stack, Typography } from 'src/shared/ui-kit';

type AnalyticsHeroProps = {
  title: string;
  heading: string;
  description: string;
  loadingLabel: string;
  isLoading: boolean;
};

const AnalyticsHero = ({ title, heading, description, loadingLabel, isLoading }: AnalyticsHeroProps) => (
  <HeroCard>
    <Typography variant="body2" color="secondary" weight="bold">
      {title}
    </Typography>
    <Typography variant="h2">{heading}</Typography>
    <Typography variant="body1" color="secondary">
      {description}
    </Typography>
    {isLoading && (
      <Stack direction="row" gap={1} align="center">
        <CircularProgress size={24} />
        <Typography variant="body2" color="secondary">
          {loadingLabel}
        </Typography>
      </Stack>
    )}
  </HeroCard>
);

const HeroCard = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default AnalyticsHero;
