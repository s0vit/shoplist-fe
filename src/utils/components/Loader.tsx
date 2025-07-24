import { alpha, Box, Paper, useTheme } from '@mui/material';
import coinFlip from 'src/assets/giphy.webp';

const Loader = () => {
  const theme = useTheme();

  return (
    <Paper>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        bgcolor={alpha(theme.palette.background.paper, 0.5)}
        sx={{ backdropFilter: 'blur(5px)' }}
        zIndex={9999}
      >
        <img src={coinFlip} alt="loading" />
      </Box>
    </Paper>
  );
};

export default Loader;
