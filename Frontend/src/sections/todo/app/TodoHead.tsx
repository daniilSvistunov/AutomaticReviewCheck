import { useRef } from 'react';

import { useTasksDispatch } from '../provider/tasksProviderFunctions';

export default function TodoHead() {
  //TODO: Sortierung anzeigen
  const orderRef = useRef(1);
  const dispatch = useTasksDispatch();

  return (
    <thead>
      <tr>
        <th>Status</th>
        <th>
          <button
            onClick={() => {
              orderRef.current *= -1;
              if (dispatch) {
                dispatch({
                  type: 'sort',
                  column: 'task',
                  order: orderRef.current,
                });
              }
            }}
          >
            Aufgabe
          </button>
        </th>
        <th>
          <button
            onClick={() => {
              orderRef.current *= -1;
              if (dispatch) {
                dispatch({
                  type: 'sort',
                  column: 'date',
                  order: orderRef.current,
                });
              }
            }}
          >
            Datum
          </button>
        </th>
        <th>Funktionen</th>
      </tr>
    </thead>
  );
}
