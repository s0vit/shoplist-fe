import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorWrapper from 'src/utils/components/ErrorWrapper.tsx';
import { HomeOutlined, Refresh, ReportGmailerrorred } from '@mui/icons-material';

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
            <Box padding={2}>
              <ReportGmailerrorred color="error" sx={{ fontSize: 80 }} />
              <Typography variant="h4" gutterBottom>
                Something went wrong.
              </Typography>
              <Typography variant="body1" gutterBottom>
                An unexpected error has occurred.
              </Typography>
              <Typography variant="body2" gutterBottom>
                Please try reloading the page or go back to the home page.
              </Typography>
              <ButtonGroup fullWidth>
                <Button variant="contained" color="primary" onClick={this.handleReload} startIcon={<Refresh />}>
                  Reload
                </Button>
                <Button variant="outlined" color="primary" component={RouterLink} to="/" startIcon={<HomeOutlined />}>
                  Home
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
};

type TErrorBoundaryState = {
  hasError: boolean;
};

export default ErrorBoundary;
