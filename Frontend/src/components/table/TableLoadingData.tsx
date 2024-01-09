import { CircularProgress, TableCell, TableRow } from '@mui/material';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

type Props = {
  isLoading: boolean;
};

export default function TableLoadingData({ isLoading }: Props) {
  return (
    <TableRow>
      {isLoading ? (
        <TableCell colSpan={12}>
          <Container
            sx={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CircularProgress />
          </Container>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
