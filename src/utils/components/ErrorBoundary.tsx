import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link as RouterLink } from 'react-router-dom';
import ErrorWrapper from 'src/utils/components/ErrorWrapper.tsx';

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
          <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
          <Typography variant="h4" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" gutterBottom>
            An unexpected error has occurred. Please try reloading the page or go back to the home page.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={this.handleReload}>
              Reload
            </Button>
            <Button variant="outlined" color="primary" component={RouterLink} to="/">
              Home
            </Button>
          </Box>
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
