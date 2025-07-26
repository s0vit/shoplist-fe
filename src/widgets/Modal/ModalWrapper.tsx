import { Backdrop, Fade, Modal } from '@mui/material';

import { PropsWithChildren } from 'react';
import styles from './ModalWrapper.module.scss';

type TModelWrapperProps = {
  onClickAway: () => void;
  isModalOpen?: boolean;
};

// TODO: It should handle the modals state

const ModalWrapper = ({ onClickAway, children, isModalOpen = false }: PropsWithChildren<TModelWrapperProps>) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={onClickAway}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500, sx: { zIndex: 998, backdropFilter: 'blur(10px)' } } }}
    >
      <Fade in={isModalOpen}>
        <div className={styles.modalWrapper}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default ModalWrapper;
