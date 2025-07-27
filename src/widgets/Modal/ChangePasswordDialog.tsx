import { FormControl } from 'src/shared/ui-kit';
import { Dialog, DialogActions, DialogContent, DialogTitle, Alert, AlertTitle } from 'src/shared/ui-kit';
import { FormHelperText, IconButton, Input, Typography, InputAdornment, Box } from 'src/shared/ui-kit';

import { Button } from 'src/shared/ui-kit';

import { useState } from 'react';

import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import { TPasswordChangeRequest } from 'src/shared/api/authApi';
import passwordValidate from 'src/utils/helpers/passwordValidate.ts';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('profile');

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
      <DialogTitle>{t('Change you password')}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Typography variant="body2" weight="medium" gutterBottom>
            {t('Current password')}
          </Typography>
          <Box style={{ position: 'relative' }}>
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPasswordInput}
              error={!!formError.currentPasswordError || !!formError.differentPasswordsError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPasswordInput(e.target.value)}
              onBlur={() =>
                setFormError({ ...formError, currentPasswordError: passwordValidate(currentPasswordInput, 'password') })
              }
              style={{ paddingRight: '40px' }}
            />
            <InputAdornment
              position="end"
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <IconButton
                icon={showCurrentPassword ? 'eyeSlash' : 'eye'}
                onClick={() => handleClickShowPassword(setShowCurrentPassword)}
              />
            </InputAdornment>
          </Box>
          {(formError.currentPasswordError || formError.differentPasswordsError) && (
            <FormHelperText error>
              {t(formError.currentPasswordError) || t(formError.differentPasswordsError)}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="body2" weight="medium" gutterBottom>
            {t('New password')}
          </Typography>
          <Box style={{ position: 'relative' }}>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              value={newPasswordInput}
              error={
                !!formError.newPasswordError || !!formError.equalPasswordsError || !!formError.differentPasswordsError
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordInput(e.target.value)}
              onBlur={() => {
                setFormError({ ...formError, newPasswordError: passwordValidate(newPasswordInput, 'password') });
              }}
              style={{ paddingRight: '40px' }}
            />
            <InputAdornment
              position="end"
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <IconButton
                icon={showNewPassword ? 'eyeSlash' : 'eye'}
                onClick={() => handleClickShowPassword(setShowNewPassword)}
              />
            </InputAdornment>
          </Box>
          {(formError.newPasswordError || formError.equalPasswordsError || formError.differentPasswordsError) && (
            <FormHelperText error>
              {t(formError.newPasswordError) ||
                t(formError.equalPasswordsError) ||
                t(formError.differentPasswordsError)}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="body2" weight="medium" gutterBottom>
            {t('Confirm password')}
          </Typography>
          <Box style={{ position: 'relative' }}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPasswordInput}
              error={!!formError.confirmPasswordError || !!formError.equalPasswordsError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPasswordInput(e.target.value)}
              onBlur={() => {
                setFormError({
                  ...formError,
                  confirmPasswordError: passwordValidate(confirmPasswordInput, 'password'),
                });
              }}
              style={{ paddingRight: '40px' }}
            />
            <InputAdornment
              position="end"
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <IconButton
                icon={showConfirmPassword ? 'eyeSlash' : 'eye'}
                onClick={() => handleClickShowPassword(setShowConfirmPassword)}
              />
            </InputAdornment>
          </Box>
          {(formError.confirmPasswordError || formError.equalPasswordsError) && (
            <FormHelperText error>
              {t(formError.confirmPasswordError) || t(formError.equalPasswordsError)}
            </FormHelperText>
          )}
        </FormControl>
        <Alert severity="warning" style={{ marginTop: '10px' }}>
          <AlertTitle>{t('Warning: ')}</AlertTitle>
          {t('After changing you will sign out.')}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAbortReset} variant="outlined" label={t('Cancel')} width="100%" />
        <Button
          onClick={handleSubmitForm}
          variant="contained"
          label={t('Apply')}
          width="100%"
          disabled={
            !!formError.currentPasswordError ||
            !!formError.newPasswordError ||
            !!formError.confirmPasswordError ||
            currentPasswordInput.length < 5 ||
            newPasswordInput.length < 5 ||
            confirmPasswordInput.length < 5
          }
        />
      </DialogActions>
    </Dialog>
  );
};

ChangePasswordDialog.propTypes = {};

export default ChangePasswordDialog;
