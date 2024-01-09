import { LoadingButtonProps } from '@mui/lab';
import { BoxProps, ButtonProps, IconButtonProps, MenuItemProps, StackProps } from '@mui/material';
import { SxProps } from '@mui/system';
import { ComponentType } from 'react';

export type CustomButtonProps = Omit<
  ButtonProps & LoadingButtonProps & IconButtonProps & MenuItemProps,
  'name'
> & {
  name: string;
};

export type CustomToolbarButtonItem = {
  props?: CustomButtonProps;
  Element?: ComponentType<BoxProps>;
};

export type CustomToolbarToolsProps = {
  name: string;
  items: CustomToolbarButtonItem[];
};

export type CustomToolbarWorkflowProps = {
  name: string;
  items: CustomToolbarButtonItem[];
};

export type CustomToolbarAdditionalsProps = {
  name: string;
  items: CustomToolbarButtonItem[];
};

export type CustomToolbarMoreProps = {
  name: string;
  items: CustomToolbarButtonItem[];
};

export type ToolbarProps = {
  sx?: SxProps;
}

export type CustomToolbarProps = {
  name: string;
  tools?: CustomToolbarButtonItem[];
  workflow?: CustomToolbarButtonItem[];
  additionals?: CustomToolbarButtonItem[];
  more?: CustomToolbarButtonItem[];
  toolbarProps?: ToolbarProps;
  stackProps?: StackProps;
};
