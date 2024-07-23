import { RHFTextField } from '@components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddRounded } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { type Priority, postTask } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { FilterChips } from '@sections/task-properties';
import { type SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { type InferType, date, number, object, string } from 'yup';

// ----------------------------------------------------------------------

const schema = object({
  title: string().required(),
  due: date().required(),
  reminder: object({ minutes: number(), hours: number(), days: number() }),
  priority: string(),
  bucket: string(),
  team: string(),
  assignee: string(),
}).required();

type SchemaType = InferType<typeof schema>;

// ----------------------------------------------------------------------

export default function AddTaskCard() {
  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: { title: '' },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SchemaType> = ({ reminder, priority, ...task }) => {
    dispatch(
      postTask({
        ...(Object.values(reminder).some((value) => value !== undefined) && { reminder }),
        priority: priority as Priority,
        ...task,
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <Card
        autoComplete="off"
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CardContent>
          <RHFTextField
            fullWidth
            label="Aufgaben Titel"
            name="title"
            required
            size="small"
            sx={{ maxWidth: 'sm' }}
          />
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', pb: 3, px: 3 }}>
          <FilterChips />

          <Button size="small" startIcon={<AddRounded />} type="submit" variant="contained">
            Hinzufügen
          </Button>
        </CardActions>
      </Card>
    </FormProvider>
  );
}
