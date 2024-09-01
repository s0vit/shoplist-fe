import { confirmEmail, TConfirmEmailResponse } from 'src/shared/api/authApi.ts';
import { useMutation } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useTranslation } from 'react-i18next';

type TConfirmEmailComponentProps = {
  token: string;
};

const ConfirmEmailComponent = ({ token }: TConfirmEmailComponentProps) => {
  const toastIdRef = useRef<Id>();
  const navigate = useNavigate();
  const { t } = useTranslation('loginPage');
  const {
    isPending: isConfirmPending,
    isSuccess: isConfirmSuccess,
    mutate: confirmMutate,
    error: confirmError,
  } = useMutation<TConfirmEmailResponse, TErrorResponse>({
    mutationFn: () => confirmEmail({ token }),
  });

  useEffect(() => {
    if (!isConfirmPending && !isConfirmSuccess && !confirmError) {
      confirmMutate();
    }
  }, [confirmError, confirmMutate, isConfirmPending, isConfirmSuccess]);

  useEffect(() => {
    if (isConfirmSuccess) {
      toast.dismiss(toastIdRef.current);
      setTimeout(() => {
        navigate(RoutesEnum.LOGIN);
      }, 3000);
    }
  }, [isConfirmSuccess, navigate]);

  if (isConfirmPending) {
    toastIdRef.current = toast('Confirming email...', { isLoading: isConfirmPending, autoClose: false });

    return (
      <Box padding={2}>
        <Paper>
          <Typography variant="h4">{t('Confirming email...')}</Typography>
        </Paper>
      </Box>
    );
  }

  if (isConfirmSuccess) {
    toast('Email confirmed', { type: 'success' });

    return (
      <Box padding={2}>
        <Paper>
          <Stack spacing={1}>
            <Typography variant="h4">{t('Email confirmed')}</Typography>
            <Typography variant="body1">{t('Redirecting to login page...')}</Typography>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (confirmError) {
    toast(confirmError.message, { type: 'error' });

    return (
      <Box padding={2}>
        <Paper>
          <Typography variant="h4">{t('Error confirming email')}</Typography>
        </Paper>
      </Box>
    );
  }

  return null;
};

export default ConfirmEmailComponent;
