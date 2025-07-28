import { Fade, Modal } from 'src/shared/ui-kit';

import { PropsWithChildren } from 'react';
import styles from './ModalWrapper.module.scss';

type TModelWrapperProps = {
  onClickAway: () => void;
  isModalOpen?: boolean;
};

// TODO: It should handle the modals state

const ModalWrapper = ({ onClickAway, children, isModalOpen = false }: PropsWithChildren<TModelWrapperProps>) => {
  return (
    <Modal open={isModalOpen} onClose={onClickAway} closeAfterTransition>
      <Fade in={isModalOpen} timeout={500}>
        <div className={styles.modalWrapper}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default ModalWrapper;
