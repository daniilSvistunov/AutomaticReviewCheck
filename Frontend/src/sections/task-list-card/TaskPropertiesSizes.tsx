import {
  BookmarkRounded,
  CalendarTodayRounded,
  GroupRounded,
  NotificationsRounded,
  PersonRounded,
  PriorityHighRounded,
} from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { type Properties as Props } from '@redux/slices/task';
import { format, formatDuration } from 'date-fns';

// ----------------------------------------------------------------------

const StyledChip = styled(Chip)({ backgroundColor: 'transparent' });

export default function TaskPropertiesSizes({
  due,
  reminder,
  priority,
  bucket,
  team,
  assignee,
}: Readonly<Props>) {
  return (
    <Stack direction="row">
      <StyledChip icon={<CalendarTodayRounded />} label={format(due, 'dd.MM.yy')} />

      {reminder && <StyledChip icon={<NotificationsRounded />} label={formatDuration(reminder)} />}
      {priority && <StyledChip icon={<PriorityHighRounded />} label={priority} />}
      {bucket && <StyledChip icon={<BookmarkRounded />} label={bucket} />}
      {team && <StyledChip icon={<GroupRounded />} label={team} />}
      {assignee && <StyledChip icon={<PersonRounded />} label={assignee} />}
    </Stack>
  );
}
