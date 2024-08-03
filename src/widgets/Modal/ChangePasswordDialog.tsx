import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type TChangePasswordDialogProps = {
  openResetPasswordDialog: boolean;
  setOpenResetPasswordDialog: (value: boolean) => void;
  handleConfirmReset: (oldPassword: string, newPassword: string) => void;
};

const ChangePasswordDialog = ({
  openResetPasswordDialog,
  setOpenResetPasswordDialog,
  handleConfirmReset,
}: TChangePasswordDialogProps) => {
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [isNewPasswordInputTouched, setIsNewPasswordInputTouched] = useState(false);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isConfirmPasswordInputTouched, setIsConfirmPasswordInputTouched] = useState(false);
  const [equalError, setequalError] = useState('');
  const regex = /^(?=.*[0-9])(?=.*[A-Z]).*$/;

  const handleAbortReset = () => {
    setOpenResetPasswordDialog(false);
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setIsNewPasswordInputTouched(false);
    setIsConfirmPasswordInputTouched(false);
    setequalError('');
  };

  const passwordValidation = (value: string, callback: (errorMessage: string) => void) => {
    if (value.length === 0) callback('Fill out this field');
    else if (value.length < 6) callback('Should contain 6 or more symbols');
    else if (value.length > 20) callback('Should contain less than 20 symbols');
    else if (!regex.test(value)) callback('Should contain at least 1 number and 1 capital letter');
    else callback('');
  };

  const equalNewPasswordValidation = () => {
    if (isNewPasswordInputTouched && isConfirmPasswordInputTouched && newPasswordInput !== confirmPasswordInput) {
      setequalError('Passwords must be equal');
    } else {
      setequalError('');
    }
  };

  return (
    <Dialog open={openResetPasswordDialog} onClose={handleAbortReset}>
      <DialogTitle>Change you password</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          error={!!currentPasswordError}
          helperText={currentPasswordError}
          onBlur={() => passwordValidation(currentPasswordInput, setCurrentPasswordError)}
          variant="outlined"
          label="Current password"
          value={currentPasswordInput}
          margin="dense"
          onChange={(e) => setCurrentPasswordInput(e.target.value)}
        />
        <TextField
          fullWidth
          error={!!newPasswordError || !!equalError}
          helperText={newPasswordError || equalError}
          onBlur={() => {
            passwordValidation(newPasswordInput, setNewPasswordError);
            if (!isNewPasswordInputTouched) setIsNewPasswordInputTouched(true);
            equalNewPasswordValidation();
          }}
          variant="outlined"
          label="New password"
          value={newPasswordInput}
          margin="dense"
          onChange={(e) => setNewPasswordInput(e.target.value)}
        />
        <TextField
          fullWidth
          error={!!confirmPasswordError || !!equalError}
          helperText={confirmPasswordError || equalError}
          onBlur={() => {
            passwordValidation(confirmPasswordInput, setConfirmPasswordError);
            if (!isConfirmPasswordInputTouched) setIsConfirmPasswordInputTouched(true);
            equalNewPasswordValidation();
          }}
          variant="outlined"
          label="Confirm password"
          value={confirmPasswordInput}
          margin="dense"
          onChange={(e) => setConfirmPasswordInput(e.target.value)}
        />
        <Typography variant="caption" style={{ color: 'red', paddingRight: '5px' }}>
          Warning: After changing you will sign you out.
        </Typography>
        <Typography variant="caption"></Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAbortReset} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleConfirmReset(currentPasswordInput, newPasswordInput)}
          color="success"
          variant="contained"
          disabled={
            newPasswordInput.length < 6 ||
            newPasswordInput.length > 20 ||
            !regex.test(newPasswordInput) ||
            newPasswordInput !== confirmPasswordInput ||
            newPasswordInput == currentPasswordInput
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
