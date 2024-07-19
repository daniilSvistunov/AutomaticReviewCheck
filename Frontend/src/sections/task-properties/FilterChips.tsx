import {
  BookmarkRounded,
  GroupRounded,
  PersonRounded,
  PriorityHighRounded,
} from '@mui/icons-material';
import { Stack } from '@mui/material';
import {
  type Properties,
  Priority,
  selectAssignees,
  selectBuckets,
  selectTeams,
} from '@redux/slices/task';
import { useSelector } from '@redux/store';

import DatePicker from './DatePicker';
import FilterValueMenu from './FilterValueMenu';

// ----------------------------------------------------------------------

interface Props {
  properties: Properties;
  onSelect: (properties: Properties) => void;
}

// ----------------------------------------------------------------------

export default function FilterChips({ properties, onSelect }: Readonly<Props>) {
  const buckets = useSelector(selectBuckets);
  const teams = useSelector(selectTeams);
  const assignees = useSelector(selectAssignees);

  return (
    <Stack direction="row" spacing={1}>
      <DatePicker
        setValue={(value) => onSelect({ ...properties, due: value })}
        value={properties.due}
      />

      <FilterValueMenu
        icon={<PriorityHighRounded />}
        label="Priorität"
        onSelect={(value) => onSelect({ ...properties, priority: value as Priority })}
        selected={properties.priority}
        values={[...Object.values(Priority)]}
      />

      <FilterValueMenu
        icon={<BookmarkRounded />}
        label="Bucket"
        onSelect={(value) => onSelect({ ...properties, bucket: value })}
        selected={properties.bucket}
        values={buckets}
      />

      <FilterValueMenu
        icon={<GroupRounded />}
        label="Team"
        onSelect={(value) => onSelect({ ...properties, team: value })}
        selected={properties.team}
        values={teams}
      />

      <FilterValueMenu
        icon={<PersonRounded />}
        label="Zuweisen an"
        onSelect={(value) => onSelect({ ...properties, assignee: value })}
        selected={properties.assignee}
        values={assignees}
      />
    </Stack>
  );
}
