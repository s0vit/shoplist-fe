import { Button, Stack, TextField, Typography } from '@mui/material';
import ModalWrapper from 'src/widgets/Modal/ModalWrapper';
import FormWrapper from '../Forms/FormWrapper';

type TCommentModalProps = {
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: (open: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
};

const CommentModal = ({ isCommentModalOpen, setIsCommentModalOpen, comment, setComment }: TCommentModalProps) => {
  return (
    <ModalWrapper isModalOpen={isCommentModalOpen} onClickAway={() => setIsCommentModalOpen(false)}>
      <FormWrapper>
        <Stack spacing={2} direction="column">
          <Typography variant="h5">Add Comment</Typography>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button fullWidth variant="contained" onClick={() => setComment('')} color="warning">
              Clear
            </Button>
            <Button fullWidth variant="contained" onClick={() => setIsCommentModalOpen(false)} color="success">
              Save
            </Button>
          </Stack>
        </Stack>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default CommentModal;
