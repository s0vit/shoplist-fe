import { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@mui/material';
import useUserStore from 'src/entities/user/model/store/_useUserStore.ts';
import { useMutation } from '@tanstack/react-query';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import { uploadAvatar } from 'src/shared/api/userApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { getRefreshToken } from 'src/shared/api/authApi.ts';

type TProfilePhotoUploaderProps = {
  file: File | null;
  onClose: () => void;
  isOpen: boolean;
};

const ProfilePhotoUploader = ({ file, onClose, isOpen }: TProfilePhotoUploaderProps) => {
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  const userData = useUserStore.use.user?.();
  const setUserData = useUserStore.use.setUser();
  const { mutate: avatarUploadMutate } = useMutation<void, TErrorResponse, FormData>({
    mutationFn: uploadAvatar,
    onError: handleError,
    onSuccess: () => {
      getRefreshToken({ refreshToken: userData!.refreshToken }).then((data) => {
        setUserData(data);
      });
    },
  });

  useEffect(() => {
    if (file) {
      setScale(1);
    }
  }, [file]);

  const handleScaleChange = (_event: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const fileFromCanvas = new File([blob], 'avatar.png', {
            type: 'image/png',
          });
          const formData = new FormData();
          formData.append('file', fileFromCanvas);
          avatarUploadMutate(formData);
          onClose();
        }
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Adjust your photo</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          {file && (
            <AvatarEditor
              ref={editorRef}
              image={file}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
              scale={scale}
              rotate={0}
            />
          )}
          <Slider
            value={scale}
            min={1}
            max={2}
            step={0.01}
            onChange={handleScaleChange}
            aria-labelledby="continuous-slider"
            sx={{ width: 200, marginTop: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfilePhotoUploader;
