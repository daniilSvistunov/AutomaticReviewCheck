import { ButtonProps, DialogContentProps, DialogProps } from '@mui/material';

export type ModalProps = {
  open: boolean;
  isDirty: boolean;
  title: string;
  children?: React.ReactNode;
  dialogProps?: Omit<DialogProps, 'children'>;
  dialogContentProps?: Omit<DialogContentProps, 'children'>;
  saveButtonProps?: Omit<ButtonProps, 'children'>;
  abortButtonProps?: Omit<ButtonProps, 'children'>;
};
