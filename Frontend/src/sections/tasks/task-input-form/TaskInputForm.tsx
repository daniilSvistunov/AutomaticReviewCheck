import { useLocales } from '@locales';
import { Button, Input } from '@mui/material';
import { createNewTask } from '@redux/slices/tasks';
import { useDispatch } from '@redux/store';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TaskInputForm() {
  const [enteredValue, setEnteredValue] = useState('');
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEnteredValue(event.target.value);
  };

  // Function that adds a task
  const handleAddButtonClick = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enteredValue && enteredValue !== '') {
      try {
        await dispatch(
          createNewTask({
            id: uuidv4(),
            title: enteredValue,
            description: '',
          })
        );
      } catch (error) {
        // TODO: Better error handling with custom component (see other todo)
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleAddButtonClick}>
      <Input
        id="myInput"
        type="text"
        placeholder={`${translate('tasks.placeholder.input')}`}
        value={enteredValue}
        onChange={handleInputChange}
      />
      <Button variant="contained" type="submit">
        {`${translate('tasks.addTask')}`}
      </Button>
    </form>
  );
}
