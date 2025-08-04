import styled from 'styled-components';
import { Container } from 'src/shared/ui-kit';

const ErrorWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: var(--color-card-bg);
  padding: var(--spacing-lg);
`;

export default ErrorWrapper;
