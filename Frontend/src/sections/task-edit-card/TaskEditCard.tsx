import { default as FormProvider, RHFTextField } from '@components/hook-form';
import Iconify from '@components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { i18n } from '@locales';
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
import { type Priority, type Step, type Task, deleteTask, patchTask } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { FilterChips } from '@sections/task-properties';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type InferType, date, number, object, string } from 'yup';

// ----------------------------------------------------------------------

type Update = Omit<Task, 'checked'>;

type Props = {
  open: boolean;
  onClose: () => void;
} & Update;

const schema = object({
  title: string().required(),
  note: string(),
  due: date().required(),
  reminder: object({ minutes: number(), hours: number(), days: number() }),
  priority: string(),
  bucket: string(),
  team: string(),
  assignee: string(),
}).required();

type SchemaType = InferType<typeof schema>;

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
  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: { title, note, ...properties },
  });

  const dispatch = useDispatch();

  const [list, setList] = useState<Step[]>(steps);

  function createStep() {
    setList([...list, { id: list.length === 0 ? 1 : list[list.length - 1].id + 1, text: '' }]);
  }

  function updateStep(step: Step) {
    setList(list.map((item) => (item.id === step.id ? step : item)));
  }

  function deleteStep(id: number) {
    setList(list.filter((item) => item.id !== id));
  }

  const onSubmit: SubmitHandler<SchemaType> = ({ reminder, priority, ...task }) => {
    dispatch(
      patchTask(id, {
        ...(Object.values(reminder).some((value) => value !== undefined) && { reminder }),
        priority: priority as Priority,
        steps: list,
        ...task,
      })
    );

    onClose();
  };

  function handleDelete() {
    dispatch(deleteTask(id));

    onClose();
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogTitle sx={{ pb: 1.5 }}>
          {`${i18n.t('task.task', { count: 1 })} ${i18n.t('common.edit')}`}
        </DialogTitle>

        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 18 }}>
          <CloseRounded />
        </IconButton>

        <DialogContent sx={{ pt: 1.5 }}>
          <Stack spacing={2}>
            <RHFTextField
              label={`${i18n.t('task.task', { count: 0 })} ${i18n.t('common.placeholders.title')}`}
              name="title"
              size="small"
            />

            <RHFTextField label={`${i18n.t('task.note')}`} name="note" size="small" />

            <FilterChips />

            {list.map((item) => (
              <Stack direction="row" key={item.id} spacing={1.25} sx={{ alignItems: 'center' }}>
                <TextField
                  fullWidth
                  onChange={(event) => updateStep({ id: item.id, text: event.target.value })}
                  placeholder={`${i18n.t('task.step')} ${i18n.t('common.add')}`}
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
              {`${i18n.t('task.step')} ${i18n.t('common.add')}`}
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
            {`${i18n.t('task.task', { count: 1 })} ${i18n.t('task.delete')}`}
          </Button>

          <Button size="small" startIcon={<CheckRounded />} type="submit" variant="contained">
            {`${i18n.t('common.save')}`}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
