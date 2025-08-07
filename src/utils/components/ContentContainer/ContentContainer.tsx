import { Box } from 'src/shared/ui-kit';
import styles from './ContentContainer.module.scss';

const ContentContainer = ({ children, ...props }: React.ComponentProps<typeof Box>) => {
  return (
    <Box className={styles.root} {...props}>
      {children}
    </Box>
  );
};

export default ContentContainer;
