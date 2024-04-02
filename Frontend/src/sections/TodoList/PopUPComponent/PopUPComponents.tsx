import { yupResolver } from '@hookform/resolvers/yup';
import i18n from '@locales/i18n';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Divider, IconButton, Modal, Paper, TextField, Tooltip } from '@mui/material';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { updateTask } from '@redux/slices/list';
import { useDispatch, useSelector } from '@redux/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
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

function InputPopup() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.match('[0-9]+')?.[0];
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      date: new Date(list.tasks[Number(id)].Date),
      importance: list.tasks[Number(id)].importance - 1,
      Task: list.tasks[Number(id)].todo,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const index = Number(id);
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
            <Tooltip title={`${i18n.t('common.edit')}`}>
              <IconButton type="submit">
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${i18n.t('common.abort')}`}>
              <IconButton onClick={() => navigate('/')}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
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
