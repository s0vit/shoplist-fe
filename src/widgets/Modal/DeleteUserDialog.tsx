import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { TextField } from 'src/shared/ui-kit';

import { Typography, Button } from 'src/shared/ui-kit';

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
        <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined" label={t('Cancel')} width="100%" />
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          label={t('Delete')}
          width="100%"
          disabled={userData?.email !== emailInput}
        />
      </DialogActions>
    </Dialog>
  );
};

DeleteUserDialog.propTypes = {};

export default DeleteUserDialog;
