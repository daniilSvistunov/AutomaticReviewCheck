import { MenuItem, TextFieldProps, Typography } from '@mui/material';
import { isEqual } from 'lodash';

import { RHFAutocomplete, RHFDatePicker, RHFSelect, RHFTextField } from '.';
import { RHFAutocompleteProps } from './RHFAutocomplete';
import { DropdownProps, InputFieldProps, InputFieldType, ReadOnlyProps } from './types';

// ----------------------------------------------------------------------
type Props<T> =
  | TextFieldProps
  | DropdownProps
  | ReadOnlyProps
  | Omit<RHFAutocompleteProps<T, boolean, boolean, boolean>, 'name' | 'renderInput'>
  | undefined;

function getDropDownValues<T>(props: Props<T>) {
  if (props && 'dropDownOptions' in props) {
    const { dropDownOptions, ...remainingProps } = props;
    return { dropDownOptions, remainingProps };
  } else {
    return { dropDownOptions: null, remainingProps: { ...props } };
  }
}

// ----------------------------------------------------------------------

export default function InputField<Name extends string, T extends object>({
  field,
  sx,
}: InputFieldProps<Name, T>) {
  if (!field) {
    return null;
  }
  const { name, translation, required, disabled, inputType, props } = field;
  const { dropDownOptions, remainingProps } = getDropDownValues<T>(props);

  return (
    <>
      {inputType === InputFieldType.DatePicker && (
        <RHFDatePicker
          name={name}
          label={translation}
          multiline
          fullWidth
          required={required ?? false}
          disabled={disabled ?? false}
          size="small"
          sx={sx}
          {...(remainingProps as TextFieldProps)}
        ></RHFDatePicker>
      )}
      {inputType === InputFieldType.DropDown && (
        <RHFSelect
          name={name}
          variant="outlined"
          label={translation}
          multiline
          fullWidth
          required={required ?? false}
          disabled={disabled ?? false}
          size="small"
          sx={sx}
          {...(remainingProps as DropdownProps)}
        >
          {dropDownOptions &&
            dropDownOptions.map(({ label, value }) => (
              <MenuItem key={name + label} value={value}>
                {label}
              </MenuItem>
            ))}
        </RHFSelect>
      )}
      {inputType === InputFieldType.Autocomplete && (
        <RHFAutocomplete
          label={translation}
          isOptionEqualToValue={(option, value) => isEqual(option, value)}
          disableClearable
          fullWidth
          size="small"
          sx={sx}
          {...(remainingProps as Omit<
            RHFAutocompleteProps<string, boolean, boolean, boolean>,
            'name'
          >)}
          name={name}
        />
      )}
      {inputType === InputFieldType.TextField && (
        <RHFTextField
          name={name}
          label={translation}
          multiline
          fullWidth
          required={required ?? false}
          disabled={disabled ?? false}
          size="small"
          sx={sx}
          {...(remainingProps as TextFieldProps)}
        ></RHFTextField>
      )}
      {inputType === InputFieldType.ReadOnly && (
        <>
          <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
            {`${translation}`}
          </Typography>

          <Typography variant="body2">{(props as ReadOnlyProps)?.value || '--'}</Typography>
        </>
      )}
    </>
  );
}
