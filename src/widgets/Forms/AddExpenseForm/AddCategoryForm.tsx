import FormWrapper from 'src/widgets/Forms/FormWrapper.tsx';
import { Button, FormControl, FormGroup, InputLabel, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createCategory, TCategory, TCreateCategoryInput } from 'src/shared/api/categoryApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import useLoadCategories from 'src/entities/category/hooks/useLoadCategories.ts';
import { Colorful } from '@uiw/react-color';
import getRandomHexColor from 'src/utils/helpers/getRandomHexColor.ts';

type TAddCategoryFormProps = {
  closeModal: () => void;
};

const AddCategoryForm = ({ closeModal }: TAddCategoryFormProps) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(getRandomHexColor());
  const theme = useTheme();
  const [comments, setComments] = useState('');
  const { fetchCategories } = useLoadCategories();
  const {
    mutate: createCategoryMutate,
    error: createCategoryError,
    isPending: isCreateCategoryPending,
    isSuccess: isCreateCategorySuccess,
  } = useMutation<TCategory, TErrorResponse, TCreateCategoryInput>({
    mutationFn: createCategory,
    mutationKey: ['category'],
    onSuccess: () => {
      fetchCategories();
      closeModal();
    },
  });

  const addCategory = () => {
    createCategoryMutate({ color, title, comments });
  };

  useEffect(() => {
    if (isCreateCategorySuccess) {
      toast('Category source added', { type: 'success' });
      fetchCategories();
    }
  }, [fetchCategories, isCreateCategorySuccess]);

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
        <Stack gap={1} paddingY={2}>
          <Colorful color={color} onChange={(color) => setColor(color.hex)} disableAlpha style={{ width: '100%' }} />
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: color, color: theme.palette.getContrastText(color) }}
            onClick={() => {
              setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
            }}
          >
            Random Color
          </Button>
          <FormControl disabled={isCreateCategoryPending}>
            <InputLabel size="small">Title</InputLabel>
            <OutlinedInput size="small" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl disabled={isCreateCategoryPending}>
            <InputLabel size="small">Comments</InputLabel>
            <OutlinedInput size="small" type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormControl>
          <Button variant="outlined" type="submit" onClick={addCategory} disabled={isCreateCategoryPending}>
            Add
          </Button>
        </Stack>
      </FormGroup>
    </FormWrapper>
  );
};

export default AddCategoryForm;
