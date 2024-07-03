import { Avatar, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import {
  deleteAccessControl,
  TAccessControl,
  TCreateAccessControlRequest,
  updateAccessControl,
} from 'src/shared/api/accessControlApi.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useLoadAccessControls from 'src/entities/accessControl/hooks/useLoadAccessControls.ts';
import { findUserById } from 'src/shared/api/userApi.ts';
import { useEffect } from 'react';
import { Delete } from '@mui/icons-material';
import { TPaymentSource } from 'src/shared/api/paymentsSourceApi.ts';
import { TCategory } from 'src/shared/api/categoryApi.ts';
import AccessControlSharedExpenses from 'src/entities/accessControl/ui/AccessControlSharedExpenses.tsx';
import { TExpense } from 'src/shared/api/expenseApi.ts';
import AccessControlSharedCategories from 'src/entities/accessControl/ui/AccessControlSharedCategories.tsx';
import AccessControlSharedPaymentSources from 'src/entities/accessControl/ui/AccessControlSharedPaymentSources.tsx';

type TAccessControlItemProps = {
  accessControl: TAccessControl;
  categories: TCategory[];
  expenses: TExpense[];
  paymentSources: TPaymentSource[];
};

const AccessControlItem = ({ accessControl, paymentSources, categories, expenses }: TAccessControlItemProps) => {
  const theme = useTheme();
  const { fetchAccessControls } = useLoadAccessControls(false);
  const {
    data: user,
    isPending: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user', accessControl.sharedWith],
    queryFn: () => findUserById(accessControl.sharedWith),
  });

  const { mutate: updateAccessControlMutate } = useMutation<
    TAccessControl,
    TErrorResponse,
    { id: string; data: TCreateAccessControlRequest }
  >({
    mutationFn: ({ id, data }) => updateAccessControl(id, data),
    onError: handleError,
    onSuccess: fetchAccessControls,
  });

  const { mutate: deleteAccessControlMutate } = useMutation({
    mutationFn: () => deleteAccessControl(accessControl._id),
    onError: handleError,
    onSuccess: fetchAccessControls,
  });

  useEffect(() => {
    if (userError) handleError(userError);
  }, [userError]);

  return (
    <Paper key={accessControl._id}>
      <Stack p={2} mt={2} gap={2}>
        {isUserLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Stack direction="row" gap={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" gap={2} alignItems="center" maxWidth="calc(100% - 58px)">
              <Avatar src={user?.avatar} alt={user?.login} />
              <Typography overflow="hidden" textOverflow="ellipsis">
                {user?.login}
              </Typography>
            </Stack>
            <Button
              onClick={() => deleteAccessControlMutate()}
              sx={{
                minWidth: 0,
                px: 1,
                border: `1px solid ${theme.palette.error.main}`,
              }}
            >
              <Delete color="error" />
            </Button>
          </Stack>
        )}
        {accessControl.expenseIds.length > 0 && (
          <AccessControlSharedExpenses
            expenses={expenses}
            accessControl={accessControl}
            categories={categories}
            paymentSources={paymentSources}
            updateAccessControlMutate={updateAccessControlMutate}
          />
        )}
        {accessControl.categoryIds.length > 0 && (
          <AccessControlSharedCategories
            accessControl={accessControl}
            updateAccessControlMutate={updateAccessControlMutate}
            categories={categories.filter((category) => accessControl.categoryIds.includes(category._id))}
          />
        )}
        {accessControl.paymentSourceIds.length > 0 && (
          <AccessControlSharedPaymentSources
            accessControl={accessControl}
            updateAccessControlMutate={updateAccessControlMutate}
            paymentSources={paymentSources.filter((paymentSource) =>
              accessControl.paymentSourceIds.includes(paymentSource._id),
            )}
          />
        )}
      </Stack>
    </Paper>
  );
};

export default AccessControlItem;
