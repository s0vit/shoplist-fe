import styled from 'styled-components';
import { Box } from 'src/shared/ui-kit';
import useWindowWidth from 'src/utils/hooks/useWindowWidth';

const StyledContentContainer = styled(Box)`
  //TODO: add dynamic height value for UnverifiedAlert block
  height: calc(100vh - 64px);
  background-color: var(--color-bg);
  padding: var(--spacing-md);
  overflow-y: auto;

  @media (max-width: 900px) {
    height: calc(100vh - 56px);

    & > * {
      padding-bottom: var(--spacing-xl);
    }
  }

  @media (max-height: 740px) {
    padding: var(--spacing-sm);
  }
`;

const ContentContainer = ({ children, ...props }: React.ComponentProps<typeof Box>) => {
  const { isDesktopWidth } = useWindowWidth();

  return (
    <StyledContentContainer
      {...props}
      style={{
        height: `calc(100vh - ${isDesktopWidth ? 64 : 56}px)`,
      }}
    >
      {children}
    </StyledContentContainer>
  );
};

export default ContentContainer;
