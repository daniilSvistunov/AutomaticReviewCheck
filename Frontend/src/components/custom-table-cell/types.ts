import { StackProps, TextFieldProps, TypographyProps } from '@mui/material';
import { SxProps } from '@mui/system';
import { ChangeEventHandler, ReactNode } from 'react';

// ----------------------------------------------------------------------

//TODO In Zukunft Währungslokalisierung oder -auswahl für '€' implementieren.
export type Suffix = '€' | 'h' | 'PT' | 'Stk' | 'Tickets' | 'd';
export type Prefix = '∑'


// ----------------------------------------------------------------------

export type CustomTableCellProps = ( CustomDataFieldProps | CustomInputFieldProps ) & {
  StackProps?: StackProps;
  childrenBefore?: ReactNode;
  childrenAfter?: ReactNode;
  sx?: SxProps;
  suffix?: Suffix;
  prefix?: Prefix;
};

export type CustomDataFieldProps = {
  id: string;
  type: 'DataField';
  value: string;
  secondValue?: string;
  TypographyProps?: TypographyProps;
  caption?: {
    label: string;
    value: string;
    suffix?: Suffix;
  };
};

export type CustomInputFieldProps = {
  id: string;
  type: 'InputField';
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLElement>;
  TextfieldProps?: TextFieldProps;
  caption?: {
    label: string;
    value: string;
    suffix?: Suffix;
    warning?: string;
    onClickCaption?: () => void;
  };
};

