import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { useLocales } from '../../locales';
import { ModalProps } from './types';

const AddEditModal = ({
  open,
  isDirty,
  title,
  children,
  dialogProps,
  dialogContentProps,
  saveButtonProps,
  abortButtonProps,
}: ModalProps) => {
  const { translate } = useLocales();

  return (
    <Dialog open={open} fullWidth {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent {...dialogContentProps}>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" size="medium" {...abortButtonProps}>
          {`${translate('save.abort')}`}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          {...saveButtonProps}
          disabled={!isDirty}
        >
          {`${translate('save.label')}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditModal;
