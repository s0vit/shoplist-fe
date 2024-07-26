import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { TUser } from 'src/shared/api/authApi';

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
  return (
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
  );
};

DeleteUserDialog.propTypes = {};

export default DeleteUserDialog;
