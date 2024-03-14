import { DevTool } from '@hookform/devtools';
import { TasksContext } from '@layouts/tasks/TaskDataWrapper';
import { Task } from '@models/task';
import { Alert, Snackbar } from '@mui/material';
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

import i18n from '../../../locales/i18n';

export default function EditDialog({ selectedTaskId }: { selectedTaskId: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openedSnackbar, setIsOpenedSnackbar] = useState<boolean>(false);
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

  const handleOnClickSave = async (data: Task) => {
    try {
      await dispatch(updateSelectedTaskByID(data));
      setOpen(false);
      setIsOpenedSnackbar(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {`${i18n.t('common.edit')}`}
      </Button>
      <Snackbar
        open={openedSnackbar}
        autoHideDuration={2500}
        onClose={() => setIsOpenedSnackbar(false)}
      >
        <Alert
          onClose={() => setIsOpenedSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {`${i18n.t('tasks.snackbar.success')}`}
        </Alert>
      </Snackbar>
      {currentTask ? (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmit((formData) => {
              const { title, description } = formData;
              const updatedTask: Task = {
                id: currentTask.id,
                title,
                description,
              };
              handleOnClickSave(updatedTask);
            }),
          }}
        >
          <>
            <DialogTitle>{currentTask.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{`${i18n.t('tasks.dialog.contentText')}`}</DialogContentText>
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => handleOnClickSave}
              >
                {`${i18n.t('common.save')}`}
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>{`${i18n.t(
                'common.abort'
              )}`}</Button>
            </DialogActions>
            <DevTool control={control} />
          </>
        </Dialog>
      ) : null}
    </>
  );
}
