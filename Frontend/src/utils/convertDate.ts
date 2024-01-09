type InputValue = Date | string | number | null;

export function convertLocalToUTCDate(date: InputValue) {
  if (!date) {
    return date;
  }
  date = new Date(date);
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return date;
}
