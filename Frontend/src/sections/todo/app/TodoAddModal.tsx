import { useSnackbar } from '@components/snackbar';
import { ModalProps } from '@models/base';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { addTodoTask } from '@redux/slices/todo';
import { dispatch } from '@redux/store';
import { useState } from 'react';

export default function TodoAddModal({ open, onClose }: Readonly<ModalProps>) {
  const [dateValue, setDateValue] = useState<string>('');
  const [taskValue, setTaskValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    //TODO: Besser Mitteilung an den User (snackbar? oder Field error/rot)
    if (dateValue === '' || taskValue === '') {
      alert('Missing Value');
      return;
    }

    try {
      setLoading(true);
      await dispatch(addTodoTask({ task: taskValue, date: dateValue, state: false }));
      enqueueSnackbar(`Das Hinzufügen der Aufgabe war erfolgreich`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Fehler beim Hinzufügen der neuen Aufgabe`, { variant: 'error' });
    }
    setLoading(false);
    handleClose();
  }

  const handleClose = () => {
    onClose?.();
    setTaskValue('');
    setDateValue('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Hier kannst du eine Aufgabe hinzufügen!</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minWidth: '35rem', px: 4 }}>
        <Stack alignItems={'center'} gap={'10px'}>
          <Box width={'100%'}>
            <TextField
              fullWidth={true}
              id="task"
              title="task"
              placeholder="Aufgabe"
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
            />
          </Box>
          <Box width={'100%'}>
            <TextField
              fullWidth={true}
              type="datetime-local"
              id="date"
              title="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          title="Hinzufügen"
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Hinzufügen
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
