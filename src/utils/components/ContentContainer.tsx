import { Box, BoxProps, styled } from '@mui/material';

const ContentContainer = styled(Box)<BoxProps>(({ theme }) => {
  return {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),

    '@media (max-width: 900px)': {
      '& > *': {
        paddingBottom: theme.spacing(7),
      },
    },
  };
});

export default ContentContainer;
