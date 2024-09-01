import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { TUser } from 'src/shared/api/authApi';
import { useTranslation } from 'react-i18next';

type TDeleteUserDialogProps = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (value: boolean) => void;
  emailInput: string;
  setEmailInput: (value: string) => void;
  handleConfirmDelete: () => void;
  userData?: TUser;
};

const DeleteUserDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  emailInput,
  setEmailInput,
  handleConfirmDelete,
  userData,
}: TDeleteUserDialogProps) => {
  const { t } = useTranslation('profile');

  return (
    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
      <DialogTitle>{t('Confirm Profile Deletion')}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {t('Please enter your email address to confirm deletion:')}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label={t('Email')}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
          {t('Cancel')}
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          disabled={userData?.email !== emailInput}
        >
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteUserDialog.propTypes = {};

export default DeleteUserDialog;
