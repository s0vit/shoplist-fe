import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Paper, Typography } from 'src/shared/ui-kit';

import { Box } from 'src/shared/ui-kit';

import { Link as RouterLink } from 'react-router-dom';
import ErrorWrapper from 'src/utils/components/ErrorWrapper.tsx';
import { HomeOutlined, Refresh, ReportGmailerrorred } from '@mui/icons-material';
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
              <ReportGmailerrorred color="error" style={{ fontSize: 80 }} />
              <Typography variant="h3" gutterBottom>
                {this.props.t('Something went wrong.')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {this.props.t('An unexpected error has occurred.')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {this.props.t('Please try reloading the page or go back to the home page.')}
              </Typography>
              <ButtonGroup fullWidth>
                <Button variant="contained" color="primary" startIcon={<Refresh />}>
                  {this.props.t('Reload')}
                </Button>
                <Button variant="outlined" color="primary" component={RouterLink} to="/" startIcon={<HomeOutlined />}>
                  {this.props.t('Home')}
                </Button>
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
