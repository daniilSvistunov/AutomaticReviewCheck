import { yupResolver } from '@hookform/resolvers/yup';
import i18n from '@locales/i18n';
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { updateTask } from '@redux/slices/list';
import { useDispatch, useSelector } from '@redux/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';

type FormFields = {
  importance: number;
  date: Date;
  Task: string;
};
interface RouteParams {
  [key: string]: string;
  id: string;
}
const schema = yup.object({
  importance: yup.number().required('importance is Requiered'),
  date: yup.date().required('Date is requiered'),
  Task: yup.string().required('Task is requiered'),
});

function InputPopup() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const param = useParams<RouteParams>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      date: new Date(list.tasks[Number(param.id)].Date),
      importance: list.tasks[Number(param.id)].importance - 1,
      Task: list.tasks[Number(param.id)].todo,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const index = Number(param.id);
    const task = { ...list.tasks[index] };
    data.Task === undefined ? undefined : (task.todo = data.Task);
    data.date === undefined ? undefined : (task.Date = data.date.toLocaleDateString());
    data.importance === undefined ? undefined : (task.importance = data.importance + 1);
    dispatch(updateTask({ index: index, task: task }));
    navigate('/');
  };

  return (
    <Modal open={true} onClose={() => navigate('/')}>
      <Paper
        sx={{
          padding: '1rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '90%',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={'row'}
            spacing={1}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FormControl sx={{ m: 1, minWidth: '15%' }} size="small">
              <InputLabel>{`${i18n.t('todoList.popUp.importance')}`}</InputLabel>
              <Select
                {...register('importance', { required: true })}
                defaultValue={list.tasks[Number(param.id)].importance - 1}
              >
                {i18n
                  .t('todoList.importanceSelect.select', { returnObjects: true })
                  .map((option: string, index: number) => (
                    <MenuItem key={option} value={index}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Controller
              {...register('date')}
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  renderInput={(props: Date) => <TextField {...props} size="small" />}
                />
              )}
            />
            <TextField
              {...register('Task')}
              sx={{ minWidth: '40%' }}
              variant="outlined"
              size="small"
              label={`${i18n.t('todoList.addInputDescription')}`}
            />
            <ButtonGroup variant="contained">
              <Button type="submit">{`${i18n.t('common.edit')}`}</Button>
              <Button onClick={() => navigate('/')}>{`${i18n.t('common.abort')}`}</Button>
            </ButtonGroup>
          </Stack>
        </form>
        <Stack>
          {errors.importance && <p style={{ color: 'red' }}> {errors.importance?.message}</p>}
          {errors.date && <p style={{ color: 'red' }}> {errors.date?.message}</p>}
          {errors.Task && <p style={{ color: 'red' }}> {errors.Task?.message}</p>}
        </Stack>
        <Divider />
      </Paper>
    </Modal>
  );
}
export default InputPopup;
