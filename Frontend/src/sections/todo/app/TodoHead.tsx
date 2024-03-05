import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { SortTypes, todoSort } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';

export default function TodoHead() {
  const { sortingOrder } = useSelector((state) => state.todo.filter);

  return (
    <thead>
      <tr>
        <th>Status</th>
        <th>
          <button
            onClick={() =>
              dispatch(
                todoSort(
                  sortingOrder === SortTypes.TaskAscending
                    ? SortTypes.TaskDescending
                    : SortTypes.TaskAscending
                )
              )
            }
          >
            Aufgabe
          </button>
          {sortingOrder === SortTypes.TaskAscending && <ArrowDropDownIcon />}
          {sortingOrder === SortTypes.TaskDescending && <ArrowDropUpIcon />}
        </th>
        <th>
          <button
            onClick={() =>
              dispatch(
                todoSort(
                  sortingOrder === SortTypes.DateAscending
                    ? SortTypes.DateDescending
                    : SortTypes.DateAscending
                )
              )
            }
          >
            Datum
          </button>
          {sortingOrder === SortTypes.DateAscending && <ArrowDropDownIcon />}
          {sortingOrder === SortTypes.DateDescending && <ArrowDropUpIcon />}
        </th>
        <th>Funktionen</th>
      </tr>
    </thead>
  );
}
