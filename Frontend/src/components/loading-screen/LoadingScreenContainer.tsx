import { styled, SxProps } from '@mui/material';

import LoadingScreenContent from './LoadingScreenContent';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

type Props = {
  sx?: SxProps;
};
const LoadingScreenContainer = ({ sx }: Props) => {
  return (
    <StyledRoot sx={{ ...sx }}>
      <LoadingScreenContent />
    </StyledRoot>
  );
};

export default LoadingScreenContainer;
