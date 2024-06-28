import { Box, BoxProps, styled, useMediaQuery } from '@mui/material';

const ContentContainer = styled(Box)<BoxProps>(({ theme }) => {
  const toolbarHeight = useMediaQuery(theme.breakpoints.up('sm')) ? 64 : 56;

  return {
    height: `calc(100vh - ${toolbarHeight}px)`,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    overflowY: 'auto',

    '@media (max-width: 900px)': {
      '& > *': {
        paddingBottom: theme.spacing(7),
      },
    },
  };
});

export default ContentContainer;
