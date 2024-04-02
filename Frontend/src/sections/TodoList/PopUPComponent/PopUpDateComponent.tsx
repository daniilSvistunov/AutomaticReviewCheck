import { Modal, Paper, TextField, TextFieldProps } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { updateTask } from '@redux/slices/list';
import { useDispatch, useSelector } from '@redux/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

type FormFields = {
  date: Date;
};
function DateInputPopUp() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const id = Number(location.pathname.match('[0-9]+')?.[0]);
  const { handleSubmit, register, control } = useForm<FormFields>({
    defaultValues: {
      date: new Date(list.tasks[Number(id)].Date),
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const task = { ...list.tasks[id] };
    dispatch(updateTask({ index: task.id, task: task }));
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
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            {...register('date')}
            name="date"
            control={control}
            render={({ field }) => (
              <StaticDatePicker
                {...field}
                onChange={handleSubmit(onSubmit)}
                renderInput={(props: TextFieldProps) => <TextField {...props} size="small" />}
              />
            )}
          />
        </form>
      </Paper>
    </Modal>
  );
}

export default DateInputPopUp;
