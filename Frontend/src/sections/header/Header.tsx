import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Header() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4">ToDo Liste</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 14 }} variant="body2">
        Aufgaben
      </Typography>
    </Box>
  );
}
