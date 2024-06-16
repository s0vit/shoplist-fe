import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findUserByEmail, TFindUserByEmailResponse } from 'src/shared/api/userApi.ts';
import { TUserType } from 'src/entities/user/model/types/TUserStore.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect, useState } from 'react';
import useDebouncedValue from 'src/shared/hooks/useDebouncedValue.ts';
import { alpha, Box, Button, FormHelperText, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import handleError from 'src/utils/errorHandler.ts';
import { shareWith } from 'src/shared/api/accessControlApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { toast } from 'react-toastify';

type TShareWithModalProps = {
  expenseIds?: string[];
  categoryIds?: string[];
  paymentSourceIds?: string[];
  isOpen: boolean;
  onClose: () => void;
};

const ShareWithModal = ({ isOpen, categoryIds, paymentSourceIds, expenseIds, onClose }: TShareWithModalProps) => {
  const [email, setEmail] = useState('');
  const [foundUsers, setFoundUsers] = useState<TFindUserByEmailResponse>([]);
  const [selectedUser, setSelectedUser] = useState<TUserType | null>(null);
  const debounceEmail = useDebouncedValue(email);
  const theme = useTheme();

  const {
    isLoading: isUsersLoading,
    error: usersError,
    refetch,
  } = useQuery<TFindUserByEmailResponse, TErrorResponse>({
    queryKey: ['findUserByEmail'],
    queryFn: () => findUserByEmail(debounceEmail),
    enabled: false,
  });

  const {
    mutate,
    isPending: isShareWithPending,
    error: shareWithError,
  } = useMutation({
    mutationKey: ['shareWith'],
    mutationFn: () => shareWith({ categoryIds, paymentSourceIds, expenseIds, sharedWith: selectedUser!._id }),
    onSuccess: () => {
      onClose();
      setFoundUsers([]);
      setSelectedUser(null);
      toast(`Shared with ${selectedUser?.email}`, { type: 'success' });
    },
  });

  const handleShare = () => {
    if (!selectedUser) return;
    mutate();
  };

  const error = usersError || shareWithError;
  const isLoading = isUsersLoading || isShareWithPending;

  useEffect(() => {
    if (!debounceEmail || debounceEmail.length < 3) return;
    refetch().then((data) => (data.data ? setFoundUsers(data.data) : setFoundUsers([])));
  }, [debounceEmail, refetch]);

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const onUserSelect = useStableCallback((user: TUserType) => {
    setSelectedUser(user._id === selectedUser?._id ? null : user);
  });

  return (
    <ModalWrapper isModalOpen={isOpen} onClickAway={onClose}>
      <Paper sx={{ position: 'relative', zIndex: 1 }}>
        <Stack gap={2} justifyContent="stretch" padding={2}>
          <Typography variant="h5" gutterBottom>
            Share with
          </Typography>
          <TextField
            disabled={isLoading}
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>Enter email to share with</FormHelperText>
          <Stack>
            {foundUsers &&
              foundUsers?.map((user) => (
                <Box key={user._id}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: selectedUser?._id === user._id ? theme.palette.primary.main : 'transparent',
                      color: selectedUser?._id === user._id ? theme.palette.primary.contrastText : 'inherit',
                    }}
                    onClick={() => onUserSelect(user)}
                  >
                    {user.email}
                  </Typography>
                </Box>
              ))}
          </Stack>
          <Button variant="outlined" fullWidth onClick={handleShare} disabled={isLoading || !selectedUser}>
            Share
          </Button>
        </Stack>
      </Paper>
    </ModalWrapper>
  );
};

export default ShareWithModal;
