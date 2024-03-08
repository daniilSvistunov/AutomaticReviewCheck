import { ModalProps } from '@models/base';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { todoFilterByDate, todoFilterByTask } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';
import { useState } from 'react';

export default function TodoFilterModal({ open, onClose }: Readonly<ModalProps>) {
  const { taskFilter, dateFilter } = useSelector((state) => state.todo.filter);
  const [dateValue, setDateValue] = useState<string>(dateFilter);
  const [taskValue, setTaskValue] = useState<string>(taskFilter);

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(todoFilterByDate(dateValue));
    dispatch(todoFilterByTask(taskValue));
    handleClose();
  }

  const handleClose = () => {
    onClose?.();
  };

  const handleReset = () => {
    dispatch(todoFilterByDate(''));
    dispatch(todoFilterByTask(''));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Hier kannst du deine Aufgaben filtern!</Typography>
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
        <Button title="Hinzufügen" variant="contained" onClick={(e) => handleSubmit(e)}>
          Filter
        </Button>
        <Button title="Reset" variant="contained" onClick={() => handleReset()}>
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
