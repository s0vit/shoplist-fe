import styled from 'styled-components';
import { Paper } from 'src/shared/ui-kit';

const FormWrapper = styled(Paper)`
  width: fit-content;
  min-width: 370px;
  margin: auto;
  border-radius: var(--spacing-sm);
  padding: var(--spacing-md);

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
  }
`;

export default FormWrapper;
