import { styled } from 'styled-components';
import { Tabs, TTabsProps } from 'src/shared/ui-kit';

const CenteredTabsWrapper = styled(Tabs)<TTabsProps>`
  margin: 0 auto;
  background-color: var(--color-card-bg);

  & > * {
    justify-content: space-between;
  }
`;

export default CenteredTabsWrapper;
