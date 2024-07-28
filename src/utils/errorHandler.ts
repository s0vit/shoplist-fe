import { AxiosError } from 'axios';
import { Id, toast } from 'react-toastify';

const handleError = (error: unknown, showToast: boolean = true) => {
  const resultArray: Array<string> = [];
  let tostId: Id;

  if (error instanceof AxiosError) {
    console.error(error);
    const errorArray = error.response?.data.meta;

    if (error.response && Object.keys(errorArray).length === 0) {
      resultArray.push(error.response?.data.message);
    } else {
      for (const key in errorArray) {
        const errorArrayValue = errorArray[key];

        if (Array.isArray(errorArrayValue)) {
          resultArray.push(errorArrayValue.join(', '));
        }
      }
    }

    if (!resultArray.length) {
      resultArray.push(error.response?.data.message || 'Something went wrong');
    }

    if (!showToast) return;

    tostId = toast(resultArray.join(', '), { type: 'error' });

    return tostId;
  }

  if (error instanceof Error) {
    console.error(error.message);

    if (!showToast) return;
    tostId = toast(error.message, { type: 'error' });

    return tostId;
  }

  console.error(error);

  if (!showToast) return;
  tostId = toast(JSON.stringify(error), { type: 'error' });

  return tostId;
};

export default handleError;
