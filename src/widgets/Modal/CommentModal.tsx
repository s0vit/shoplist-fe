import { FormHelperText, Stack, TextField } from 'src/shared/ui-kit';

import { Typography, Button } from 'src/shared/ui-kit';

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
        <Stack gap={2} direction="column">
          <Typography variant="h3">{t('Add Comment')}</Typography>
          <TextField
            size="small"
            autoFocus
            label={t('Comment')}
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
            error={comment.length >= maxLengthCommentSymbols}
          />
          <FormHelperText style={{ textAlign: 'left' }}>
            {`${t('Maximum number of characters:')} ${comment.length} / ${maxLengthCommentSymbols}`}
          </FormHelperText>
          <Stack direction="row" gap={2} sx={{ marginTop: 16 }}>
            <Button variant="contained" label={t('Clear')} width="100%" />
            <Button variant="contained" label={t('Save')} width="100%" />
          </Stack>
        </Stack>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CommentModal;
