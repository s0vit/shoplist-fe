import { Box, Button, CircularProgress, IconButton, Paper, Typography } from 'src/shared/ui-kit';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { parseReceipt, TReceiptParseResponse } from 'src/shared/api/expenseApi.ts';
import { TErrorResponse } from 'src/shared/api/rootApi.ts';
import handleError from 'src/utils/errorHandler.ts';
import { useTranslation } from 'react-i18next';
import styles from './ReceiptScanner.module.scss';

type TReceiptScannerProps = {
  onScanComplete: (result: TReceiptParseResponse) => void;
};

const ReceiptScanner = ({ onScanComplete }: TReceiptScannerProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast(t('Please select an image file'), { type: 'error' });

        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast(t('File size must be less than 10MB'), { type: 'error' });

        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
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

        {!previewUrl ? (
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
