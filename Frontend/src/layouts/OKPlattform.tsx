import { Box, styled, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const HEADER_HEIGHT = 80;
const NAV_WIDTH = 250;
const ASIDE_WIDTH = 235;

const SideBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: theme.palette.background.neutral,
}));

const OKPlattformLayout = () => {
  return (
    <>
      <Box
        component="header"
        sx={{
          height: HEADER_HEIGHT,
          boxShadow: 3,
          position: 'sticky',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>OKPLATTFORM PLACEHOLDER</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <SideBox
          component="nav"
          sx={{
            width: NAV_WIDTH,
          }}
        >
          <Typography>OKPLATTFORM PLACEHOLDER</Typography>
        </SideBox>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${NAV_WIDTH + ASIDE_WIDTH}px)`,
          }}
        >
          <Outlet />
        </Box>
        <SideBox
          component="aside"
          sx={{
            width: ASIDE_WIDTH,
          }}
        >
          <Typography>OKPLATTFORM PLACEHOLDER</Typography>
        </SideBox>
      </Box>
    </>
  );
};

export default OKPlattformLayout;
