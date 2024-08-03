import { PhotoCamera } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import Settings from 'src/entities/userSettings/ui/Settings';
import { changePassword, getNewLink } from 'src/shared/api/authApi';
import { deleteMe } from 'src/shared/api/userApi';
import handleError from 'src/utils/errorHandler.ts';
import useLogout from 'src/utils/hooks/useLogout';
import DeleteUserDialog from 'src/widgets/Modal/DeleteUserDialog';
import ProfilePhotoUploader from './ProfilePhotoUploader';
import ChangePasswordDialog from 'src/widgets/Modal/ChangePasswordDialog.tsx';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const Profile = () => {
  const [openUploader, setOpenUploader] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState(['', '', '']);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const userData = useUserStore.use.user?.();

  const { mutate: getNewLinkMutate } = useMutation({
    mutationFn: getNewLink,
    onError: (error) => handleError(error),
  });
  const { handleLogout } = useLogout();

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: () => deleteMe(),
    onError: (error) => handleError(error),
    onSuccess: handleLogout,
  });

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      setSelectedFile(file);
      setOpenUploader(!!file);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (userData?.email === emailInput) {
      deleteUserMutate();
      setOpenDeleteDialog(false);
    }
  };

  const handleConfirmResetPassword = useStableCallback(async () => {
    if (userData?.accessToken) {
      try {
        await changePassword({
          oldPassword: newPasswordInput[0],
          newPassword: newPasswordInput[1],
        });
        toast('Password has changed successfully', { type: 'success' });
        setOpenResetPasswordDialog(false);
        setNewPasswordInput(['', '', '']);
      } catch (e) {
        if (e instanceof AxiosError) {
          toast(e.response!.data.message as string, { type: 'error' });
        }
      }
    }
  });

  return (
    <Box>
      <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4, textAlign: 'center' }}>
        {userData?.login && (
          <Typography variant="h4" gutterBottom>
            {userData.login}
          </Typography>
        )}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            position="relative"
            borderRadius={50}
            display="inline-block"
            sx={{ marginBottom: 2, overflow: 'hidden' }}
          >
            <Avatar
              src={userData?.avatar}
              alt="User Avatar"
              sx={{ width: 100, height: 100, cursor: 'pointer' }}
              onClick={handleAvatarClick}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: -8,
                right: 0,
                left: 0,
                p: 0.5,
                borderRadius: 0,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                },
              }}
              onClick={handleAvatarClick}
            >
              <PhotoCamera />
            </IconButton>
          </Box>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Typography variant="body1" gutterBottom>
            email: {userData?.email}
            <br />
            isVerified: {`${userData?.isVerified}`}
            <Button
              variant="contained"
              onClick={() => {
                setOpenResetPasswordDialog(true);
              }}
              sx={{ marginBottom: 2, marginTop: 2, marginLeft: 2 }}
            >
              Change password
            </Button>
          </Typography>
          {!userData?.isVerified && (
            <Button variant="contained" onClick={() => getNewLinkMutate()} sx={{ marginBottom: 2 }}>
              New verification link
            </Button>
          )}
        </Box>

        <Accordion sx={{ marginTop: 4 }} elevation={2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Settings</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Settings />
          </AccordionDetails>
        </Accordion>
        <Button variant="contained" color="error" onClick={handleDeleteClick} sx={{ marginTop: 2 }}>
          Delete Profile
        </Button>
        <ProfilePhotoUploader file={selectedFile} onClose={() => setOpenUploader(false)} isOpen={openUploader} />
        <DeleteUserDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          handleConfirmDelete={handleConfirmDelete}
          userData={userData}
        />
        <ChangePasswordDialog
          newPasswordInput={newPasswordInput}
          setNewPasswordInput={setNewPasswordInput}
          openResetPasswordDialog={openResetPasswordDialog}
          setOpenResetPasswordDialog={setOpenResetPasswordDialog}
          handleConfirmReset={handleConfirmResetPassword}
        />
      </Paper>
    </Box>
  );
};

export default Profile;
