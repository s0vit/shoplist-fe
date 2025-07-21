import ModalWrapper from 'src/widgets/Modal/ModalWrapper.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findUserByEmail, TFindUserByEmailResponse } from 'src/shared/api/userApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { useEffect, useState } from 'react';
import useDebouncedValue from 'src/utils/hooks/useDebouncedValue.ts';
import { alpha, Avatar, Box, FormHelperText, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import handleError from 'src/utils/errorHandler.ts';
import { shareWith } from 'src/shared/api/accessControlApi.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { toast } from 'react-toastify';
import emailToHexColor from 'src/utils/helpers/emailToHexColor.ts';
import { TUser } from 'src/shared/api/authApi.ts';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/shared/ui-kit';

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
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const debounceEmail = useDebouncedValue(email);
  const theme = useTheme();
  const { t } = useTranslation('shareWith');

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

  const onUserSelect = useStableCallback((user: TUser) => {
    if (user.isVerified) {
      setSelectedUser(user._id === selectedUser?._id ? null : user);
    }
  });

  return (
    <ModalWrapper isModalOpen={isOpen} onClickAway={onClose}>
      <Paper sx={{ position: 'relative', zIndex: 1 }}>
        <Stack gap={2} justifyContent="stretch" padding={2}>
          <Typography variant="h5" gutterBottom>
            {t('Share with')}
          </Typography>
          <TextField
            disabled={isLoading}
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>{t('Enter email to share with')}</FormHelperText>
          <Stack>
            {foundUsers &&
              foundUsers?.map((user) => {
                const emailColor = emailToHexColor(user.email);

                return (
                  <Box
                    key={user._id}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{
                      border: `1px solid ${alpha(emailColor, 0.3)}`,
                      borderRadius: 1,
                      cursor: user.isVerified ? 'pointer' : 'not-allowed',
                      backgroundColor: selectedUser?._id === user._id ? emailColor : 'transparent',
                      color: selectedUser?._id === user._id ? theme.palette.getContrastText(emailColor) : 'inherit',
                      padding: 0.5,
                      mb: 1,
                      opacity: user.isVerified ? 1 : 0.5,
                    }}
                    onClick={() => onUserSelect(user)}
                  >
                    <Avatar src={user.avatar} alt={`${user.email}'s avatar`} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h6" gutterBottom>
                      {user.email}
                    </Typography>
                  </Box>
                );
              })}
          </Stack>
          <Button
            variant="outlined"
            onClick={handleShare}
            disabled={isLoading || !selectedUser}
            label={t('Share')}
            width="100%"
          />
        </Stack>
      </Paper>
    </ModalWrapper>
  );
};

export default ShareWithModal;
