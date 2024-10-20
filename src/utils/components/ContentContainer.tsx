import { Box, BoxProps, styled, useMediaQuery } from '@mui/material';

const ContentContainer = styled(Box)<BoxProps>(({ theme }) => {
  const toolbarHeight = useMediaQuery(theme.breakpoints.up('sm')) ? 64 : 56;

  return {
    //TODO: add dynamic height value for UnverifiedAlert block
    height: `calc(100vh - 98px - ${toolbarHeight}px)`,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    overflowY: 'auto',

    '@media (max-width: 900px)': {
      '& > *': {
        paddingBottom: theme.spacing(7),
      },
    },

    '@media (max-height: 740px)': {
      padding: theme.spacing(1),
    },
  };
});

export default ContentContainer;
