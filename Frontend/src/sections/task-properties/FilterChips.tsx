import {
  BookmarkRounded,
  GroupRounded,
  PersonRounded,
  PriorityHighRounded,
} from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Priority, selectAssignees, selectBuckets, selectTeams } from '@redux/slices/task';
import { useSelector } from '@redux/store';
import { Controller } from 'react-hook-form';

import DatePicker from './DatePicker';
import FilterValueMenu from './FilterValueMenu';
import TaskDetailReminder from './TaskDetailReminder';

// ----------------------------------------------------------------------

export default function FilterChips() {
  const buckets = useSelector(selectBuckets);
  const teams = useSelector(selectTeams);
  const assignees = useSelector(selectAssignees);

  return (
    <Stack direction="row" spacing={1}>
      <DatePicker />

      <TaskDetailReminder />

      <Controller
        name="priority"
        render={({ field: { onChange, value } }) => (
          <FilterValueMenu
            icon={<PriorityHighRounded />}
            label="Priorität"
            onSelect={onChange}
            selected={value}
            values={[...Object.values(Priority)]}
          />
        )}
      />

      <Controller
        name="bucket"
        render={({ field: { onChange, value } }) => (
          <FilterValueMenu
            icon={<BookmarkRounded />}
            label="Bucket"
            onSelect={onChange}
            selected={value}
            values={buckets}
          />
        )}
      />

      <Controller
        name="team"
        render={({ field: { onChange, value } }) => (
          <FilterValueMenu
            icon={<GroupRounded />}
            label="Team"
            onSelect={onChange}
            selected={value}
            values={teams}
          />
        )}
      />

      <Controller
        name="assignee"
        render={({ field: { onChange, value } }) => (
          <FilterValueMenu
            icon={<PersonRounded />}
            label="Zuweisen an"
            onSelect={onChange}
            selected={value}
            values={assignees}
          />
        )}
      />
    </Stack>
  );
}
