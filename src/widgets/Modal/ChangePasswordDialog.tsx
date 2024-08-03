import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

type TChangePasswordDialogProps = {
  openResetPasswordDialog: boolean;
  setOpenResetPasswordDialog: (value: boolean) => void;
  newPasswordInput: string[];
  setNewPasswordInput: (value: string[]) => void;
  handleConfirmReset: () => void;
};

const ChangePasswordDialog = ({
  openResetPasswordDialog,
  setOpenResetPasswordDialog,
  newPasswordInput,
  setNewPasswordInput,
  handleConfirmReset,
}: TChangePasswordDialogProps) => {
  const regex = /^(?=.*[0-9])(?=.*[A-Z]).*$/;

  const handleAbortReset = () => {
    setOpenResetPasswordDialog(false);
    setNewPasswordInput(['', '', '']);
  };

  return (
    <Dialog open={openResetPasswordDialog} onClose={handleAbortReset}>
      <DialogTitle>Change you password</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Current password"
          value={newPasswordInput[0]}
          margin="dense"
          onChange={(e) => setNewPasswordInput([e.target.value, newPasswordInput[1], newPasswordInput[2]])}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="New password"
          value={newPasswordInput[1]}
          margin="dense"
          onChange={(e) => setNewPasswordInput([newPasswordInput[0], e.target.value, newPasswordInput[2]])}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Confirm password"
          value={newPasswordInput[2]}
          margin="dense"
          onChange={(e) => setNewPasswordInput([newPasswordInput[0], newPasswordInput[1], e.target.value])}
        />
        <Typography variant="caption">
          (Password should contain 6-20 symbols with at least 1 number and 1 capital letter)
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAbortReset} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmReset}
          color="success"
          variant="contained"
          disabled={
            newPasswordInput[1].length < 6 ||
            newPasswordInput[1].length > 20 ||
            !regex.test(newPasswordInput[1]) ||
            newPasswordInput[1] !== newPasswordInput[2] ||
            newPasswordInput[0] == newPasswordInput[1]
          }
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ChangePasswordDialog.propTypes = {};

export default ChangePasswordDialog;
