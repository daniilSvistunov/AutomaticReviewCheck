import { useRef } from 'react';

export default function TodoHead() {
  //TODO: Sortierung anzeigen
  const orderRef = useRef(1);

  return (
    <thead>
      <tr>
        <th>Status</th>
        <th>
          <button onClick={(e) => console.log(e)}>Aufgabe</button>
        </th>
        <th>
          <button onClick={(e) => console.log(e)}>Datum</button>
        </th>
        <th>Funktionen</th>
      </tr>
    </thead>
  );
}
