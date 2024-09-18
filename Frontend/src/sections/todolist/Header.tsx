import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { StyledToolbarStack } from './styles';

export default function ToDoHeader() {
  const StyledBox = styled(Box)(() => ({
    display: 'inline',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'start',
    alignItems: 'start',
    minHeight: '10vh',
    width: '100vh',
    height: '100px',
    margin: 'auto',
    backgroundColor: 'orange',
    marginBottom: '100px',
  }));
  return (
    <StyledBox>
      <StyledToolbarStack alignItems={'start'}>
        <Typography variant="h3" paragraph margin={'0px'}>
          {`ToDO Liste`}
        </Typography>
        <p>Aufgaben</p>
      </StyledToolbarStack>
    </StyledBox>
  );
}
