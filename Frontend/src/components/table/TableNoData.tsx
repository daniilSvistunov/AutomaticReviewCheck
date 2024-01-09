import { SxProps, TableCell, TableRow } from '@mui/material';

import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  sx?: SxProps;
  imgHeight?: number | string;
};

export default function TableNoData({ isNotFound, sx, imgHeight }: Props) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title="No Data"
            sx={{
              '& span.MuiBox-root': { height: imgHeight ? imgHeight : 160 },
              ...sx,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
