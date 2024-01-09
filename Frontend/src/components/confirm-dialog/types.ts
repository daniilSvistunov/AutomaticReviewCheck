import { DialogProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface ConfirmDialogProps extends Omit<DialogProps, 'title'> {
  titleComponent: React.ReactNode;
  contentComponent?: React.ReactNode;
  actionComponent: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}
