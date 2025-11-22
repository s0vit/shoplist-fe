import { Box, Button, CircularProgress, IconButton, Paper, Typography } from 'src/shared/ui-kit';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { parseReceipt, TReceiptParseResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { useTranslation } from 'react-i18next';
import { useSwipeGesture } from 'src/utils/hooks/useSwipeGesture.ts';
import { usePinchZoom } from 'src/utils/hooks/usePinchZoom.ts';
import useStableCallback from 'src/utils/hooks/useStableCallback.ts';
import styles from './ReceiptScanner.module.scss';

type TReceiptScannerProps = {
  onScanComplete: (result: TReceiptParseResponse) => void;
  onClose?: () => void;
};

type ErrorType = 'conversion' | 'upload' | 'permission' | null;

const loadHeicTo = async () => {
  const module = await import('heic-to');

  return module.heicTo;
};

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
        0.9,
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.readAsDataURL(file);
  });
};

const ReceiptScanner = ({ onScanComplete, onClose }: TReceiptScannerProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<{ type: ErrorType; message: string } | null>(null);
  const [lastScanTime, setLastScanTime] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('homePage');

  const DEBOUNCE_DELAY = 500;

  const swipeRef = useSwipeGesture({
    onSwipeDown: () => {
      if (!isScanPending && !isConverting && onClose) {
        onClose();
      }
    },
    minSwipeDistance: 80,
  });

  const {
    elementRef: zoomRef,
    style: zoomStyle,
    resetZoom,
  } = usePinchZoom({
    minScale: 1,
    maxScale: 4,
  });

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
      setError(null);
      onScanComplete(data);
      handleClear();
    },
    onError: (error) => {
      handleError(error);
      setError({
        type: 'upload',
        message: error.message || t('Failed to scan receipt'),
      });
    },
  });

  const processFile = async (file: File) => {
    if (!file) return;

    setIsConverting(true);
    setError(null);

    try {
      let processedFile = file;

      const isHeic =
        file.type === 'image/heic' ||
        file.type === 'image/heif' ||
        file.name.toLowerCase().endsWith('.heic') ||
        file.name.toLowerCase().endsWith('.heif');

      if (isHeic) {
        toast.info(t('Converting HEIC format...'));

        try {
          const heicTo = await loadHeicTo();
          const convertedBlob = await heicTo({
            blob: file,
            type: 'image/jpeg',
            quality: 0.9,
          });

          processedFile = new File([convertedBlob], file.name.replace(/\.[^.]+$/, '.jpg'), {
            type: 'image/jpeg',
          });
        } catch {
          toast.info(t('Trying alternative conversion...'));
          try {
            processedFile = await convertToJPEG(file);
          } catch {
            const errorMsg = t('Failed to convert HEIC image');
            toast(errorMsg, { type: 'error' });
            setError({ type: 'conversion', message: errorMsg });
            setIsConverting(false);

            return;
          }
        }
      }

      if (processedFile.type !== 'image/jpeg' && processedFile.type !== 'image/png') {
        processedFile = await convertToJPEG(processedFile);
      }

      if (processedFile.size > 10 * 1024 * 1024) {
        const errorMsg = t('File size must be less than 10MB');
        toast(errorMsg, { type: 'error' });
        setError({ type: 'conversion', message: errorMsg });
        setIsConverting(false);

        return;
      }

      setSelectedFile(processedFile);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setIsConverting(false);
      };

      reader.onerror = () => {
        const errorMsg = t('Failed to read image file');
        setError({ type: 'conversion', message: errorMsg });
        setIsConverting(false);
      };

      reader.readAsDataURL(processedFile);
    } catch {
      const errorMsg = t('Failed to process image');
      toast(errorMsg, { type: 'error' });
      setError({ type: 'conversion', message: errorMsg });
      setIsConverting(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await processFile(file);
    } else if (file) {
      toast(t('Please select an image file'), { type: 'error' });
    }
  };

  const handleClear = useStableCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    resetZoom();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  });

  const handleScan = useStableCallback(() => {
    if (!selectedFile) {
      toast(t('Please select a receipt image'), { type: 'error' });

      return;
    }

    const now = Date.now();
    if (now - lastScanTime < DEBOUNCE_DELAY) {
      return;
    }

    setLastScanTime(now);
    setError(null);

    const formData = new FormData();
    formData.append('receipt', selectedFile);
    parseReceiptMutate(formData);
  });

  const handleRetry = useStableCallback(() => {
    setError(null);
    if (error?.type === 'upload' && selectedFile) {
      handleScan();
    } else if (error?.type === 'conversion') {
      handleClear();
      handleButtonClick();
    }
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div ref={swipeRef}>
      <Paper className={styles.wrapper}>
        <Box className={styles.content}>
          <Box className={styles.header}>
            <Typography variant="h3" className={styles.title}>
              {t('Scan Receipt')}
            </Typography>
            {onClose && (
              <IconButton
                icon="decline"
                iconSize="sm"
                onClick={onClose}
                className={styles.closeButton}
                disabled={isScanPending || isConverting}
              />
            )}
          </Box>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {isConverting ? (
            <Box className={styles.uploadArea}>
              <CircularProgress size={48} />
              <Typography variant="body1">{t('Processing image...')}</Typography>
            </Box>
          ) : !previewUrl ? (
            <div
              className={`${styles.uploadArea} ${isDragOver ? styles.dragOver : ''}`}
              onClick={handleButtonClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleButtonClick();
                }
              }}
            >
              <IconButton icon="camera" iconSize="lg" iconVariant="secondary" />
              <Typography variant="body1">{t('Take or upload photo')}</Typography>
              <Typography variant="body2" className={styles.dragHint}>
                {t('or drag and drop here')}
              </Typography>
            </div>
          ) : (
            <Box className={styles.previewContainer}>
              <div ref={zoomRef} className={styles.zoomWrapper} style={zoomStyle}>
                <img src={previewUrl} alt="Receipt preview" className={styles.preview} />
              </div>
              <IconButton
                icon="decline"
                iconSize="sm"
                onClick={handleClear}
                className={styles.clearButton}
                disabled={isScanPending}
              />
            </Box>
          )}

          {error && (
            <Box className={styles.errorContainer}>
              <Typography variant="body2" className={styles.errorText}>
                {error.message}
              </Typography>
              <Button
                variant="outlined"
                label={t('Retry')}
                onClick={handleRetry}
                disabled={isScanPending || isConverting}
                width="100%"
              />
            </Box>
          )}

          <Box className={styles.actions}>
            {selectedFile && !error && (
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
    </div>
  );
};

export default ReceiptScanner;
