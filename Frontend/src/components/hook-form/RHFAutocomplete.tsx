import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  SxProps,
  TextField,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
// ----------------------------------------------------------------------

export interface RHFAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  label?: string;

  helperText?: React.ReactNode;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  required = false,
  helperText,
  sx,
  ...other
}: Omit<RHFAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true, shouldDirty: true })
          }
          renderInput={(params) => (
            <TextField
              label={label}
              helperText={error ? error?.message : helperText}
              error={!!error}
              required={required}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {other.loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          {...other}
          sx={{
            ...sx,
          }}
        />
      )}
    />
  );
}
