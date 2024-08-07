import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { TPasswordChangeRequest } from 'src/shared/api/authApi';
import passwordValidate from 'src/utils/helpers/passwordValidate.ts';

type TChangePasswordDialogProps = {
  openResetPasswordDialog: boolean;
  setOpenResetPasswordDialog: (value: boolean) => void;
  handleConfirmChange: ({ oldPassword, newPassword }: TPasswordChangeRequest) => void;
};

type TFormError = {
  currentPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
  equalPasswordsError: string;
  differentPasswordsError: string;
};

const ChangePasswordDialog = ({
  openResetPasswordDialog,
  setOpenResetPasswordDialog,
  handleConfirmChange,
}: TChangePasswordDialogProps) => {
  const initialFormError: TFormError = {
    currentPasswordError: '',
    newPasswordError: '',
    confirmPasswordError: '',
    equalPasswordsError: '',
    differentPasswordsError: '',
  };
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<TFormError>(initialFormError);

  const handleAbortReset = () => {
    setOpenResetPasswordDialog(false);
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setFormError({ ...initialFormError });
  };

  const finalDataValidation = useStableCallback(
    (currentPassword: string, newPassword: string, confirmPassword: string) => {
      let validationResult = true;
      let differentPasswordsValidate;
      let equalPasswordsValidate;

      if (currentPassword === newPassword) {
        differentPasswordsValidate = 'Passwords must be differ';
        validationResult = false;
      } else {
        differentPasswordsValidate = '';
      }

      if (newPassword !== confirmPassword) {
        equalPasswordsValidate = 'Passwords must be equal';
        validationResult = false;
      } else {
        equalPasswordsValidate = '';
      }

      setFormError({
        ...formError,
        differentPasswordsError: differentPasswordsValidate,
        equalPasswordsError: equalPasswordsValidate,
      });

      return validationResult;
    },
  );

  const handleSubmitForm = () => {
    const finalValidationResult = finalDataValidation(currentPasswordInput, newPasswordInput, confirmPasswordInput);

    if (finalValidationResult) {
      handleConfirmChange({ oldPassword: currentPasswordInput, newPassword: newPasswordInput });
    }
  };

  const handleClickShowPassword = (callback: (value: (prevState: boolean) => boolean) => void) => {
    callback((prev) => !prev);
  };

  return (
    <Dialog open={openResetPasswordDialog} onClose={handleAbortReset}>
      <DialogTitle>Change you password</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel
            htmlFor="current-password-input"
            error={!!formError.currentPasswordError || !!formError.differentPasswordsError}
          >
            Current password
          </InputLabel>
          <OutlinedInput
            id="current-password-input"
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPasswordInput}
            error={!!formError.currentPasswordError || !!formError.differentPasswordsError}
            onChange={(e) => setCurrentPasswordInput(e.target.value)}
            onBlur={() =>
              setFormError({ ...formError, currentPasswordError: passwordValidate(currentPasswordInput, 'password') })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(setShowCurrentPassword)}
                  edge="end"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Current password"
          />
          {(formError.currentPasswordError || formError.differentPasswordsError) && (
            <FormHelperText error id="current-password-error-text">
              {formError.currentPasswordError || formError.differentPasswordsError}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel
            htmlFor="new-password-input"
            error={
              !!formError.newPasswordError || !!formError.equalPasswordsError || !!formError.differentPasswordsError
            }
          >
            New password
          </InputLabel>
          <OutlinedInput
            id="new-password-input"
            type={showNewPassword ? 'text' : 'password'}
            value={newPasswordInput}
            error={
              !!formError.newPasswordError || !!formError.equalPasswordsError || !!formError.differentPasswordsError
            }
            onChange={(e) => setNewPasswordInput(e.target.value)}
            onBlur={() => {
              setFormError({ ...formError, newPasswordError: passwordValidate(newPasswordInput, 'password') });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle-new-password-visibility"
                  onClick={() => handleClickShowPassword(setShowNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New password"
          />
          {(formError.newPasswordError || formError.equalPasswordsError || formError.differentPasswordsError) && (
            <FormHelperText error id="new-password-error-text">
              {formError.newPasswordError || formError.equalPasswordsError || formError.differentPasswordsError}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel
            htmlFor="confirm-password-input"
            error={!!formError.confirmPasswordError || !!formError.equalPasswordsError}
          >
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="confirm-password-input"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPasswordInput}
            error={!!formError.confirmPasswordError || !!formError.equalPasswordsError}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
            onBlur={() => {
              setFormError({ ...formError, confirmPasswordError: passwordValidate(confirmPasswordInput, 'password') });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle-confirm-password-visibility"
                  onClick={() => handleClickShowPassword(setShowConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
          {(formError.confirmPasswordError || formError.equalPasswordsError) && (
            <FormHelperText error id="confirm-password-error-text">
              {formError.confirmPasswordError || formError.equalPasswordsError}
            </FormHelperText>
          )}
        </FormControl>
        <Alert severity="warning" variant="outlined" style={{ marginTop: '10px' }}>
          <AlertTitle>Warning: </AlertTitle>
          After changing you will sign out.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAbortReset} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmitForm}
          color="success"
          variant="contained"
          disabled={
            !!formError.currentPasswordError ||
            !!formError.newPasswordError ||
            !!formError.confirmPasswordError ||
            currentPasswordInput.length < 5 ||
            newPasswordInput.length < 5 ||
            confirmPasswordInput.length < 5
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
