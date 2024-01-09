import { InputAdornment, Stack, TableCell, TextField, Typography, useTheme } from '@mui/material';

import { fCurrencyValidNull } from '../../utils/formatNumber';
import { CustomTableCellProps } from './types';

// ----------------------------------------------------------------------

export default function CustomTableCell(props: CustomTableCellProps) {
  const { childrenBefore, childrenAfter, suffix, StackProps } = props;
  
  const { palette } = useTheme();

  return (
    <TableCell sx={{ ...props.sx }}>
      <Stack direction="row" alignItems={'center'} sx={{ heigth: 1 }} {...StackProps}>
        {childrenBefore}

        {props.type === 'InputField' && (
          <>
            {!props.caption ? (
              <TextField
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>,
                }}
                value={props.value}
                onChange={props.onChange}
                onClick={props.onClick}
                {...props.TextfieldProps}
                sx={{ width: 1, ...(props.TextfieldProps && { ...props.TextfieldProps.sx }) }}
              />
            ) : null}
            
            {props.caption ? (
              <Stack 
                direction='column'
                alignItems='flex-start'
                sx={{ px: 0, py: 0 }}  
              >
                <TextField
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>,
                  }}
                  value={props.value}
                  onChange={props.onChange}
                  onClick={props.onClick}
                  {...props.TextfieldProps}
                  sx={{ width: 1, ...(props.TextfieldProps && { ...props.TextfieldProps.sx }) }}
                />
                <Typography
                  variant="caption"
                  onClick={props.caption.onClickCaption}
                  sx={{ 
                    color: (props.caption?.warning ? palette.warning.main : palette.text.secondary), 
                    cursor: (props.caption.warning ? 'pointer' : null),
                    minHeight: '15px' 
                  }}>
                    {(props.caption?.warning) ? `${props.caption.warning}`: 
                      (`${props.caption?.label ?? ' '} ${props.caption?.value ?? ''} ${props.caption?.suffix ?? ''}`)
                    }
                </Typography>
              </Stack>
              ) : null}
          </>
          
        )}

        {props.type === 'DataField' && (
          <>
            {!props.caption ? (
              <Typography variant="caption" {...props.TypographyProps}>
                {props.prefix ? `${props.prefix} ` : ''}
                {suffix
                  ? suffix === '€'
                    ? fCurrencyValidNull(props.value)
                    : `${props.value} ${suffix}`
                  : props.value}
                {props.secondValue && ` ${props.secondValue}`}
              </Typography>
            ) : null}
            {props.caption ? (
              <Stack
                direction='column'
                alignItems='flex-start'
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="caption" {...props.TypographyProps}>
                  {props.prefix ? `${props.prefix} ` : ''}
                  {suffix
                    ? suffix === '€'
                      ? fCurrencyValidNull(props.value)
                      : `${props.value} ${suffix}`
                    : props.value}
                  {props.secondValue && ` ${props.secondValue}`}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: palette.text.secondary, minHeight: '15px', display: 'inline-block' }}>
                    {`${props.caption?.label ?? ' '} ${props.caption?.value ?? ''} ${props.caption?.suffix ?? ''}`}
                </Typography>
              </Stack>
            ) : null}
          </>
        )}

        {childrenAfter}
      </Stack>
    </TableCell>
  );
}
