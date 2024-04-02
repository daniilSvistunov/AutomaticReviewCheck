import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from '@locales/i18n';
import { Task } from '@models/interfaces';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormControl, IconButton, InputLabel, MenuItem, TextField, Tooltip } from '@mui/material';
import Select from '@mui/material/Select';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { addTask, postTasks } from '@redux/slices/list';
import { useSelector } from '@redux/store';
import { useDispatch } from '@redux/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
type FormFields = {
  importance: number;
  date: Date;
  Task: string;
};
const schema = yup.object({
  importance: yup.number().required('importance is Requiered'),
  date: yup.date().required('Date is requiered'),
  Task: yup.string().required('Task is requiered'),
});

function AddingTasks() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormFields> = (data, e) => {
    const item: Task = {
      todo: data.Task,
      id: list.tasks?.length,
      Date: data.date.toLocaleDateString(),
      importance: data.importance + 1,
    };
    dispatch(addTask(item));
    dispatch(postTasks(item));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={1} style={{ alignItems: 'center' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>{`${i18n.t('todoList.importance')}`}</InputLabel>
          <Controller
            name="importance"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Select {...field} label="importance" MenuProps={{ style: { zIndex: 35001 } }}>
                {i18n
                  .t('todoList.importanceSelect.select', { returnObjects: true })
                  .map((option: string, index: number) => (
                    <MenuItem key={option} value={index}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <DatePicker
              {...field}
              renderInput={(props: Date) => <TextField {...props} size="small" />}
            />
          )}
        />
        <TextField
          {...register('Task')}
          variant="outlined"
          size="small"
          label={`${i18n.t('todoList.addInputDescription')}`}
        />
        <Tooltip title={`${i18n.t('common.add')}`}>
          <IconButton type="submit">
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <DevTool control={control} />
    </form>
  );
}

export default AddingTasks;
