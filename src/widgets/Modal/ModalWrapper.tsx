import { PropsWithChildren } from 'react';
import { Backdrop, Fade, Modal } from '@mui/material';

type TModelWrapperProps = {
  onClickAway: () => void;
  isModalOpen?: boolean;
};

const ModalWrapper = ({ onClickAway, children, isModalOpen = false }: PropsWithChildren<TModelWrapperProps>) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={onClickAway}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isModalOpen}>
        <div>{children}</div>
      </Fade>
    </Modal>
  );
};

export default ModalWrapper;
