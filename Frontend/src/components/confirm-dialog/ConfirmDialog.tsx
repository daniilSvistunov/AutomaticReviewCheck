import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  titleComponent,
  contentComponent,
  actionComponent,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{titleComponent}</DialogTitle>

      {contentComponent && (
        <DialogContent sx={{ typography: 'body2' }}> {contentComponent} </DialogContent>
      )}

      <DialogActions>
        {actionComponent}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
