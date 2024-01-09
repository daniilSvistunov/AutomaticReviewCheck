import { Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { fCurrencyValidNullNoSuffix } from '@utils/formatNumber';

import { CompareValue, KeyValuePairProps } from './types';

// ----------------------------------------------------------------------

export default function KeyValuePair(props: KeyValuePairProps) {
  const { label, primaryValue, secondaryValue, compare, fontWeight } = props;
  const { palette, typography } = useTheme();
  let valueColor: string;
  switch (compare) {
    case CompareValue.green:
      valueColor = palette.success.main;
      break;
    case CompareValue.red:
      valueColor = palette.error.main;
      break;
    case CompareValue.yellow:
      valueColor = palette.warning.main;
      break;
    default:
      valueColor = palette.text.primary;
  };

  return (
    <Stack direction="row" sx={{ ...props.sx }} spacing={1} justifyContent="space-between">
      <Typography variant="body2">{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <Typography
          sx={{ color: valueColor }} 
          component="div" 
          fontWeight={ fontWeight ?? typography.fontWeightBold }
        >
          { primaryValue.isText ? primaryValue.value : fCurrencyValidNullNoSuffix(primaryValue.value) } {primaryValue.suffix ?? ''}
          {secondaryValue ? ` | ${secondaryValue.value} ${secondaryValue.suffix ?? ''}` : null}
        </Typography>
      </Box>
    </Stack>
  );
}
