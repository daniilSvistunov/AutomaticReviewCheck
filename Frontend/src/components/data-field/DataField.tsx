import { IconButton, Link, Typography } from '@mui/material';

import Iconify from '../iconify/Iconify';
import { DataFieldProps } from './types';

// ----------------------------------------------------------------------

const baseURL = 'https://dev.azure.com';

// ----------------------------------------------------------------------

const DataField = ({ field }: DataFieldProps) => {
  if (!field) {
    return null;
  }

  const { value, translation, link } = field;

  return (
    <>
      <Typography paragraph variant="overline" sx={{ color: 'text.disabled', mb: 0.5 }}>
        {translation}
      </Typography>
      <Typography variant="body2">
        {value ? value : '--'}
        {value && link && (
          <Link href={baseURL + value} target="blank">
            <IconButton size="small" color={'primary'}>
              <Iconify icon="ic:open-in-new" />
            </IconButton>
          </Link>
        )}
      </Typography>
    </>
  );
};

export default DataField;
