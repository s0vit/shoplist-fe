import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error(error);

    if (error.response?.data.meta.keys().length === 0) {
      toast(error.response?.data.message, { type: 'error' });

      return;
    }

    for (const key in error.response?.data.meta) {
      toast(error.response?.data.meta[key].join('\n'), { type: 'error' });
    }

    return;
  }

  if (error instanceof Error) {
    console.error(error.message);
    toast(error.message, { type: 'error' });

    return;
  }

  console.error(error);
  toast(JSON.stringify(error), { type: 'error' });
};
