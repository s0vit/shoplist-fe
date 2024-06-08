import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error(error);
    for (const key in error.response?.data.meta) {
      toast(error.response?.data.meta[key].join('\n'), { type: 'error' });
    }
  } else if (error instanceof Error) {
    console.error(error.message);
    toast(error.message, { type: 'error' });
  } else {
    console.error(error);
    toast(JSON.stringify(error), { type: 'error' });
  }
};
