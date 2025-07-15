import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import Button from 'src/shared/ui-kit/Button/Button';
import { useTranslation } from 'react-i18next';

type TDeleteCategoryDialog = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (value: boolean) => void;
  handleConfirmDelete: (itemId: string) => void;
  isUpdating: boolean;
  item?: { _id: string; title: string; color?: string };
};

const DeleteCategoryDialog = ({
  setOpenDeleteDialog,
  openDeleteDialog,
  handleConfirmDelete,
  isUpdating,
  item,
}: TDeleteCategoryDialog) => {
  const { t } = useTranslation('translation');

  return (
    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
      {item && (
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {t('A you sure to delete ')}
            <span style={{ color: 'red' }}>{item.title}</span>
          </Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          onClick={() => setOpenDeleteDialog(false)}
          variant="outlined"
          label={t('Cancel')}
          width="100%"
          disabled={isUpdating}
        />
        <Button
          onClick={() => item && handleConfirmDelete(item._id)}
          variant="contained"
          label={t('Delete')}
          width="100%"
          disabled={isUpdating}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
