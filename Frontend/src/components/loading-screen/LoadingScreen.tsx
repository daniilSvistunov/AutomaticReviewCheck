import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import useResponsive from '../../hooks/useResponsive';
import { NAV } from '../../layouts/config-layouts';
import ProgressBar from '../progress-bar';
import { useSettingsContext } from '../settings';
import LoadingScreenContent from './LoadingScreenContent';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { themeLayout } = useSettingsContext();

  // TODO: To be redifined for our use cases.
  const isDashboard = pathname.includes('/dashboard') && isDesktop;

  const size =
    (themeLayout === 'mini' && NAV.W_DASHBOARD_MINI) ||
    (themeLayout === 'vertical' && NAV.W_DASHBOARD) ||
    128;

  return (
    <>
      <ProgressBar />

      <StyledRoot
        sx={{
          ...(isDashboard && {
            width: `calc(100% - ${size}px)`,
            ...(themeLayout === 'horizontal' && {
              width: 1,
              height: `calc(100% - ${size}px)`,
            }),
          }),
        }}
      >
        {isDashboard ? (
          <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
        ) : (
          <LoadingScreenContent />
        )}
      </StyledRoot>
    </>
  );
}
