import { Component, ErrorInfo, ReactNode } from 'react';
import { Paper, Typography, Button, ButtonGroup, Box } from 'src/shared/ui-kit';

import ErrorWrapper from 'src/utils/components/ErrorWrapper.tsx';
import { withTranslation } from 'react-i18next';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component<TErrorBoundaryProps, TErrorBoundaryState> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <Paper>
            <Box className={styles.errorBox}>
              <Typography variant="h3" gutterBottom>
                {this.props.t('Something went wrong.')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {this.props.t('An unexpected error has occurred.')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {this.props.t('Please try reloading the page or go back to the home page.')}
              </Typography>
              <ButtonGroup>
                <Button variant="contained" label={this.props.t('Reload')} onClick={this.handleReload} />
                <Button variant="outlined" label={this.props.t('Home')} onClick={() => (window.location.href = '/')} />
              </ButtonGroup>
            </Box>
          </Paper>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

type TErrorBoundaryProps = {
  children: ReactNode;
  t: (key: string) => string;
};

type TErrorBoundaryState = {
  hasError: boolean;
};

export default withTranslation('errorBoundary')(ErrorBoundary);
