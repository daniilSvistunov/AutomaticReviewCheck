// ----------------------------------------------------------------------

import { get } from 'lodash';
import moment from 'moment';

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const valueA = get(a, orderBy);
  const valueB = get(b, orderBy);

  // Sort false values to the end
  if (!valueA) {
    return -1;
  }
  if (!valueB) {
    return 1;
  }

  // Sort ordinary string values
  if (valueB < valueA) {
    return -1;
  }
  if (valueB > valueA) {
    return 1;
  }

  // Sort date values
  if (moment(valueA).isValid() && moment(valueB).isValid()) {
    return moment(valueA).diff(moment(valueB));
  }

  // Don't sort
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
