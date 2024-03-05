import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { SortTypes, todoSort } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';

export default function TodoHead() {
  const { sort } = useSelector((state) => state.todo.filter);

  return (
    <thead>
      <tr>
        <th>Status</th>
        <th>
          <button
            onClick={() =>
              dispatch(
                todoSort(
                  sort === SortTypes.TaskAscending
                    ? SortTypes.TaskDescending
                    : SortTypes.TaskAscending
                )
              )
            }
          >
            Aufgabe
          </button>
          {sort === SortTypes.TaskAscending && <ArrowDropDownIcon />}
          {sort === SortTypes.TaskDescending && <ArrowDropUpIcon />}
        </th>
        <th>
          <button
            onClick={() =>
              dispatch(
                todoSort(
                  sort === SortTypes.DateAscending
                    ? SortTypes.DateDescending
                    : SortTypes.DateAscending
                )
              )
            }
          >
            Datum
          </button>
          {sort === SortTypes.DateAscending && <ArrowDropDownIcon />}
          {sort === SortTypes.DateDescending && <ArrowDropUpIcon />}
        </th>
        <th>Funktionen</th>
      </tr>
    </thead>
  );
}
