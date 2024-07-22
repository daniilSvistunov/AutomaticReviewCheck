import Iconify from '@components/iconify';
import { AddRounded, CheckRounded, CloseRounded } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { type Step, type Task, deleteTask, patchTask } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { FilterChips } from '@sections/task-properties';
import { pick } from 'lodash';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Update = Omit<Task, 'checked'>;

type Props = {
  open: boolean;
  onClose: () => void;
} & Update;

// ----------------------------------------------------------------------

export default function TaskEditCard({
  open,
  onClose,
  id,
  title,
  note,
  steps,
  ...properties
}: Readonly<Props>) {
  const dispatch = useDispatch();

  const [task, setTask] = useState<Update>({ id, title, note, steps, ...properties });

  const mergedProperties = {
    ...properties,
    ...pick(task, ['due', 'reminder', 'priority', 'bucket', 'team', 'assignee']),
  };

  function createStep() {
    setTask({
      ...task,
      steps: [
        ...task.steps,
        { id: task.steps.length === 0 ? 1 : task.steps[task.steps.length - 1].id + 1, text: '' },
      ],
    });
  }

  function updateStep(step: Step) {
    setTask({
      ...task,
      steps: task.steps.map((item) => (item.id === step.id ? step : item)),
    });
  }

  function deleteStep(id: number) {
    setTask({ ...task, steps: task.steps.filter((item) => item.id !== id) });
  }

  function handleUpdate() {
    // TODO: Remove Identical Fields
    dispatch(patchTask(id, task));

    onClose();
  }

  function handleDelete() {
    dispatch(deleteTask(id));

    onClose();
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <DialogTitle sx={{ pb: 1.5 }}>Aufgabe bearbeiten</DialogTitle>

      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 18 }}>
        <CloseRounded />
      </IconButton>

      <DialogContent sx={{ pt: 1.5 }}>
        <Stack spacing={2}>
          <TextField
            label="Aufgaben Titel"
            onChange={(event) => setTask({ ...task, title: event.target.value })}
            size="small"
            value={task.title}
          />

          <TextField
            label="Notiz"
            onChange={(event) => setTask({ ...task, note: event.target.value })}
            size="small"
            value={task.note ?? ''}
          />

          <FilterChips
            onSelect={(properties) => {
              setTask({ ...task, ...properties });
            }}
            properties={mergedProperties}
          />

          {task.steps.map((item) => (
            <Stack direction="row" key={item.id} spacing={1.25} sx={{ alignItems: 'center' }}>
              <TextField
                fullWidth
                onChange={(event) => updateStep({ id: item.id, text: event.target.value })}
                placeholder="Schritt hinzufügen"
                size="small"
                value={item.text}
              />

              <IconButton onClick={() => deleteStep(item.id)}>
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Stack>
          ))}

          <Button
            onClick={createStep}
            size="small"
            startIcon={<AddRounded />}
            sx={{ alignSelf: 'start' }}
          >
            Schritt hinzufügen
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          color="error"
          onClick={handleDelete}
          size="small"
          startIcon={<Iconify icon="eva:trash-2-outline" />}
          variant="contained"
        >
          Aufgabe löschen
        </Button>

        <Button
          onClick={handleUpdate}
          size="small"
          startIcon={<CheckRounded />}
          variant="contained"
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}
