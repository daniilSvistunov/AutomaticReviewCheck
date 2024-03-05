import { addTodoTask } from '@redux/slices/todo';
import { dispatch } from '@redux/store';
import { useState } from 'react';

export default function TodoAddBar() {
  const [inputState, setInputState] = useState({
    task: '',
    date: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //TODO: Besser Mitteilung an den User (snackbar? oder Field error/rot)
    for (const [key, value] of Object.entries(inputState)) {
      if (value === '') {
        alert('Missing ' + key);
        return;
      }
    }
    try {
      await dispatch(addTodoTask({ ...inputState, state: false }));
    } catch (error) {
      //TODO error handling
      //enqueueSnackbar(`${translate('messages.error.ratings.new')}`, { variant: 'error' });
      console.log(error);
    }
    setInputState({ task: '', date: '' });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState({ ...inputState, [e.target.title]: e.target.value });
  }

  return (
    <div id="todoAddBar">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="task"
            title="task"
            placeholder="Aufgabe"
            value={inputState.task}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="datetime-local"
            id="date"
            title="date"
            value={inputState.date}
            onChange={handleInput}
          />
        </div>
        <button title="Hinzufügen" className="btn greenBG ">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}
