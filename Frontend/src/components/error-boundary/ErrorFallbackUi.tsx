import { Paper, Stack, Typography } from '@mui/material';

import { useLocales } from '../../locales';
import { ErrorIcon } from '../../theme/overrides/CustomIcons';
import { ErrorFallbackUiProps } from './types';

const ErrorFallbackUi = ({ error }: ErrorFallbackUiProps) => {
  const { translate } = useLocales();

  return (
    <Stack
      sx={{
        textAlign: 'center',
      }}
    >
      <Paper sx={{ p: 3, m: 3 }}>
        <ErrorIcon color="error" />
        {error ? (
          typeof error == 'string' ? (
            <Typography variant="h5" align="center">
              {error}
            </Typography>
          ) : (
            <Typography variant="h5" align="center">
              {error.message}
            </Typography>
          )
        ) : (
          <Typography variant="h5" align="center">
            {`${translate('errorBoundaryDefault')}`}
          </Typography>
        )}
      </Paper>
    </Stack>
  );
};

export default ErrorFallbackUi;
