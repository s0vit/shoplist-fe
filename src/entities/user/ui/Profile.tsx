import { PhotoCamera } from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import { getNewLink } from 'src/shared/api/authApi';
import { deleteMe } from 'src/shared/api/userApi';
import handleError from 'src/utils/errorHandler.ts';
import useLogout from 'src/utils/hooks/useLogout';
import ProfilePhotoUploader from './ProfilePhotoUploader';

const Profile = () => {
  const [openUploader, setOpenUploader] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const userData = useUserStore.use.user?.();

  const { mutate: getNewLinkMutate } = useMutation({ mutationFn: getNewLink, onError: handleError });
  const { handleLogout } = useLogout();

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteMe,
    onError: handleError,
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
          </Typography>
          {!userData?.isVerified && (
            <Button variant="contained" onClick={() => getNewLinkMutate()} sx={{ marginBottom: 2 }}>
              New verification link
            </Button>
          )}
          <Button variant="contained" color="error" onClick={handleDeleteClick} sx={{ marginTop: 2 }}>
            Delete Profile
          </Button>
        </Box>
        <ProfilePhotoUploader file={selectedFile} onClose={() => setOpenUploader(false)} isOpen={openUploader} />
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Profile Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Please enter your email address to confirm deletion:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              disabled={userData?.email !== emailInput}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Profile;
