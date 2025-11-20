import { Box, Button, CircularProgress, IconButton, Paper, Typography } from 'src/shared/ui-kit';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';
import { parseReceipt, TReceiptParseResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { useTranslation } from 'react-i18next';
import styles from './ReceiptScanner.module.scss';

type TReceiptScannerProps = {
  onScanComplete: (result: TReceiptParseResponse) => void;
};

// Конвертация изображения в JPEG через Canvas
const convertToJPEG = async (file: File, maxWidth = 2048): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Уменьшаем размер, если изображение слишком большое
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));

        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const convertedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
              type: 'image/jpeg',
            });

            resolve(convertedFile);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        'image/jpeg',
        0.9, // Качество 90%
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.readAsDataURL(file);
  });
};

const ReceiptScanner = ({ onScanComplete }: TReceiptScannerProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('homePage');

  const { mutate: parseReceiptMutate, isPending: isScanPending } = useMutation<
    TReceiptParseResponse,
    TErrorResponse,
    FormData
  >({
    mutationFn: parseReceipt,
    onSuccess: (data) => {
      const message = data.reason
        ? `${t('Receipt scanned successfully')}\n${data.reason}`
        : t('Receipt scanned successfully');

      toast(message, { type: 'success' });
      onScanComplete(data);
      handleClear();
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsConverting(true);

    try {
      let processedFile = file;

      // Проверка на HEIC формат (iPhone)
      if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
        toast.info(t('Converting HEIC format...'));

        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        });

        const blobArray = Array.isArray(convertedBlob) ? convertedBlob : [convertedBlob];

        processedFile = new File(blobArray, file.name.replace(/\.[^.]+$/, '.jpg'), {
          type: 'image/jpeg',
        });
      }

      // Конвертируем все изображения в JPEG для гарантированной совместимости
      if (processedFile.type !== 'image/jpeg' && processedFile.type !== 'image/png') {
        processedFile = await convertToJPEG(processedFile);
      }

      // Проверка размера после конвертации
      if (processedFile.size > 10 * 1024 * 1024) {
        toast(t('File size must be less than 10MB'), { type: 'error' });
        setIsConverting(false);

        return;
      }

      setSelectedFile(processedFile);

      // Создаем preview
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setIsConverting(false);
      };

      reader.readAsDataURL(processedFile);
    } catch (error) {
      console.error('Error processing image:', error);
      toast(t('Failed to process image'), { type: 'error' });
      setIsConverting(false);
    }
  };

  const handleScan = () => {
    if (!selectedFile) {
      toast(t('Please select a receipt image'), { type: 'error' });

      return;
    }

    const formData = new FormData();
    formData.append('receipt', selectedFile);
    parseReceiptMutate(formData);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Paper className={styles.wrapper}>
      <Box className={styles.content}>
        <Typography variant="h3" className={styles.title}>
          {t('Scan Receipt')}
        </Typography>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {isConverting ? (
          <Box className={styles.uploadArea}>
            <CircularProgress size={48} />
            <Typography variant="body1">{t('Processing image...')}</Typography>
          </Box>
        ) : !previewUrl ? (
          <Box className={styles.uploadArea} onClick={handleButtonClick}>
            <IconButton icon="camera" iconSize="lg" iconVariant="secondary" />
            <Typography variant="body1">{t('Take or upload photo')}</Typography>
          </Box>
        ) : (
          <Box className={styles.previewContainer}>
            <img src={previewUrl} alt="Receipt preview" className={styles.preview} />
            <IconButton
              icon="decline"
              iconSize="sm"
              onClick={handleClear}
              className={styles.clearButton}
              disabled={isScanPending}
            />
          </Box>
        )}

        <Box className={styles.actions}>
          {selectedFile && (
            <>
              <Button
                variant="outlined"
                label={t('Clear')}
                onClick={handleClear}
                disabled={isScanPending}
                width="100%"
              />
              <Button
                variant="contained"
                label={isScanPending ? <CircularProgress size={24} /> : t('Scan')}
                onClick={handleScan}
                disabled={isScanPending}
                width="100%"
              />
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ReceiptScanner;
