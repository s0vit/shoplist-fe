import { alpha, useTheme } from 'src/shared/ui-kit';
import { Box, Paper } from 'src/shared/ui-kit';

import coinFlip from 'src/assets/giphy.webp';

const Loader = () => {
  const theme = useTheme();

  return (
    <Paper>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: alpha(theme.colors.cardBg, 0.5),
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
        }}
      >
        <img src={coinFlip} alt="loading" />
      </Box>
    </Paper>
  );
};

export default Loader;
