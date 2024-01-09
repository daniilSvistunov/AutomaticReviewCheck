import { StackProps } from "@mui/material";
import { SxProps } from "@mui/system";

export type Suffix = '€' | 'h' | 'PT' | 'Stk' | 'Tickets'| '%' | '';

export interface KeyValuePairProps {
  id: string;
  label: string;
  primaryValue: Value;
  secondaryValue?: Value;
  StackProps?: StackProps;
  sx?: SxProps;
  compare?:  CompareValue;
  fontWeight?: string,
}

interface Value {
  value: number | string;
  suffix?: Suffix;
  isText?: boolean;
}

export enum CompareValue {
  green,
  red,
  black,
  yellow,
}