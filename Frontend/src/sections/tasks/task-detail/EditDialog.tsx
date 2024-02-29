import { DevTool } from '@hookform/devtools';
import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { useLocales } from '@locales';
import { Task } from '@models/task';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { updateSelectedTaskByID } from '@redux/slices/tasks';
import { useDispatch } from '@redux/store';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

// TODO: selected ersetzen druch id
export default function EditDialog({ selectedTaskId }: { selectedTaskId: string | undefined }) {
  const [open, setOpen] = useState<boolean>(false);
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { tasks } = useContext(TasksContext);
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const currentTask: Task | undefined = tasks.find((task: Task) => task.id === selectedTaskId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClickSave = async (data: any) => {
    console.log(data);
    // TODO: implemente logic of changing title and description (using redux)
    try {
      await dispatch(updateSelectedTaskByID(data));
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Define function to edit title

  // TODO: Define function to edit description

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {`${translate('common.edit')}`}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          //   const formData = new FormData(event.currentTarget);

          //   const formJson = Object.fromEntries((formData as any).entries()); // TODO: any muss weg!
          //   const title = formJson.title;
          //   const description = formJson.description;
          //   console.log(title, description);
          //   // TODO use RHF (React Hook Form)
          //   // TODO: Write here logic for changing title and description

          //   handleClose();
          // },
          onSubmit: handleSubmit((formData) =>
            handleOnClickSave({ id: currentTask?.id, ...formData })
          ),
        }}
      >
        {currentTask ? (
          <>
            <DialogTitle>{currentTask.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{`${translate('tasks.dialog.contentText')}`}</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                {...register('title')}
                label="Title"
                type="text"
                defaultValue={currentTask.title}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                {...register('description')}
                label="Description"
                defaultValue={currentTask.description}
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{`${translate('common.abort')}`}</Button>
              <Button type="submit" onClick={handleOnClickSave}>
                {`${translate('common.save')}`}
              </Button>
            </DialogActions>
            <DevTool control={control} />
          </>
        ) : null}
      </Dialog>
    </>
  );
}
