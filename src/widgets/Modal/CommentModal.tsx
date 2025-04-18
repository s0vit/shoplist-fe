import { Button, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import ModalWrapper from 'src/widgets/Modal/ModalWrapper';
import FormWrapper from '../Forms/FormWrapper';
import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';
import { maxLengthCommentSymbols } from 'src/utils/helpers/maxLength';

type TCommentModalProps = {
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: (open: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
};

const CommentModal = ({ isCommentModalOpen, setIsCommentModalOpen, comment, setComment }: TCommentModalProps) => {
  const { t } = useTranslation('homePage');

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newComment = e.target.value.slice(0, maxLengthCommentSymbols);
    setComment(newComment);
  };

  return (
    <ModalWrapper isModalOpen={isCommentModalOpen} onClickAway={() => setIsCommentModalOpen(false)}>
      <FormWrapper>
        <Stack spacing={2} direction="column">
          <Typography variant="h5">{t('Add Comment')}</Typography>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="comment"
            label={t('Comment')}
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
            error={comment.length >= maxLengthCommentSymbols}
          />
          <FormHelperText sx={{ textAlign: 'left' }}>
            {`${t('Maximum number of characters:')} ${comment.length} / ${maxLengthCommentSymbols}`}
          </FormHelperText>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button fullWidth variant="contained" onClick={() => setComment('')} color="warning">
              {t('Clear')}
            </Button>
            <Button fullWidth variant="contained" onClick={() => setIsCommentModalOpen(false)} color="success">
              {t('Save')}
            </Button>
          </Stack>
        </Stack>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CommentModal;
