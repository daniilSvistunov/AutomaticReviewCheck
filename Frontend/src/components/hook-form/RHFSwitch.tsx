import { FormControlLabel, FormControlLabelProps, FormHelperText, Switch } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control' | 'onChange'> {
  name: string;
  helperText?: React.ReactNode;
}

export default function RHFSwitch({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Switch {...field} checked={field.value} />} {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
