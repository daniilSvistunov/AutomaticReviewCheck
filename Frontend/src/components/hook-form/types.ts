import { SxProps, TextFieldProps, Theme } from '@mui/material';

import { RHFAutocompleteProps } from './RHFAutocomplete';

export enum InputFieldType {
  DatePicker,
  TextField,
  DropDown,
  Autocomplete,
  ReadOnly,
}

export type DropdownOption = {
  label: string;
  value: string | number | readonly string[] | undefined;
};

export type DropdownProps = Omit<TextFieldProps, 'children'> & {
  native?: boolean;
  maxHeight?: boolean | number;
  dropDownOptions: DropdownOption[];
};

export type ReadOnlyProps = {
  value: string;
};

// ----------------------------------------------------------------------

export type BasicField<Name> = {
  name: Name;
  translation: string;
  inputType: InputFieldType;
  required?: boolean;
  disabled?: boolean;
};

export type FieldAutoComplete<T, Name> = BasicField<Name> & {
  props: Omit<RHFAutocompleteProps<T, boolean, boolean, boolean>, 'name' | 'renderInput'>;
};
export type FieldDropdown<Name> = BasicField<Name> & {
  props: DropdownProps;
};
export type FieldText<Name> = BasicField<Name> & {
  props?: TextFieldProps;
};
export type FieldReadOnly<Name> = BasicField<Name> & {
  props: ReadOnlyProps;
};

export type Field<Name extends string = string, T extends object = object> =
  | FieldAutoComplete<T, Name>
  | FieldDropdown<Name>
  | FieldText<Name>
  | FieldReadOnly<Name>
  | undefined;

// ----------------------------------------------------------------------

export type InputFieldProps<Name extends string = string, T extends object = object> = {
  field: Field<Name, T>;
  sx?: SxProps<Theme>;
};
