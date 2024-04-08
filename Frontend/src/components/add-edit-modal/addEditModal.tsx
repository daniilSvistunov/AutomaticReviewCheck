import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { i18n } from '../../locales';
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

  return (
    <Dialog open={open} fullWidth {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent {...dialogContentProps}>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" size="medium" {...abortButtonProps}>
          {`${i18n.t('save.abort')}`}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          {...saveButtonProps}
          disabled={!isDirty}
        >
          {`${i18n.t('save.label')}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditModal;
