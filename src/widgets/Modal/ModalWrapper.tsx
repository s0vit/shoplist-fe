import { PropsWithChildren } from 'react';
import { Modal } from '@mui/material';

type TModelWrapperProps = {
  onClickAway: () => void;
};

const ModalWrapper = ({ onClickAway, children }: PropsWithChildren<TModelWrapperProps>) => {
  return (
    <Modal open={true} onClose={onClickAway}>
      <div>{children}</div>
    </Modal>
  );
};

export default ModalWrapper;
