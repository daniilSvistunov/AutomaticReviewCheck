import { eachDayOfInterval, format, formatDistanceToNow, getTime, isWeekend } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd.MM.yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd.MM.yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fWorkdaysInterval(startDate: Date | undefined, endDate: Date | undefined) {
  if (!startDate || !endDate) {return;}
  const days = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
  const workdays = days.filter(day => !isWeekend(day));
  return workdays.length;
}
