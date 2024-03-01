import { useState } from 'react';

import { useTasksDispatch, useTasksId } from '../provider/tasksProviderFunctions';

export default function TodoAddBar() {
  const [inputState, setInputState] = useState({
    task: '',
    date: '',
  });
  const dispatch = useTasksDispatch();
  const tempId = useTasksId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //TODO: Besser Mitteilung an den User
    for (const [key, value] of Object.entries(inputState)) {
      if (value === '') {
        alert('Missing ' + key);
        return;
      }
    }
    if (dispatch) {
      dispatch({
        type: 'add',
        new: { ...inputState, state: false, id: tempId },
      });
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
