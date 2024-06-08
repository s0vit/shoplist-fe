import { FormWrapper } from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { matchIsValidColor, MuiColorInput } from 'mui-color-input';
import { createCategory, TCategory, TCreateCategoryInput } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { handleError } from 'src/utils/errorHandler.ts';

type TAddCategoryFormProps = {
  closeModal: () => void;
};

const AddCategoryForm = ({ closeModal }: TAddCategoryFormProps) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [comments, setComments] = useState('');
  const {
    mutate: createCategoryMutate,
    error: createCategoryError,
    isPending: isCreateCategoryPending,
    isSuccess: isCreateCategorySuccess,
  } = useMutation<TCategory, TErrorResponse, TCreateCategoryInput>({
    mutationFn: createCategory,
    mutationKey: ['category'],
  });
  const addCategory = () => {
    if (matchIsValidColor(color)) {
      createCategoryMutate({ color, title, comments });
    }
  };

  useEffect(() => {
    if (isCreateCategorySuccess) {
      toast('Category source added', { type: 'success' });
      closeModal();
    }
  }, [closeModal, isCreateCategorySuccess]);

  useEffect(() => {
    if (createCategoryError) {
      handleError(createCategoryError);
    }
  }, [createCategoryError]);
  return (
    <FormWrapper>
      <Typography variant="h5" textAlign="center">
        Add category
      </Typography>
      <FormGroup>
        <Stack gap={1}>
          <FormControl disabled={isCreateCategoryPending}>
            <InputLabel size="small">Title</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <MuiColorInput
            disabled={isCreateCategoryPending}
            size="small"
            value={color}
            fallbackValue="#ffffff"
            isAlphaHidden
            onChange={setColor}
            format="hex"
            sx={{ '& .MuiColorInput-Button': { marginLeft: 2 } }}
          />
          <FormControl disabled={isCreateCategoryPending}>
            <InputLabel size="small">Comments</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button type="submit" onClick={addCategory} disabled={isCreateCategoryPending}>
            Add
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default AddCategoryForm;
