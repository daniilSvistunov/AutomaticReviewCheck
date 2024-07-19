import {
  type Filter,
  type FilterItem,
  AdvancedFilter,
  isFilterItem,
} from '@components/advanced-filter';
import { Stack } from '@mui/material';
import { createFilter, selectFilter, updateFilter } from '@redux/slices/filter';
import { type Task, selectAssignees, selectBuckets, selectTeams } from '@redux/slices/task';
import { dispatch, useSelector } from '@redux/store';
import { useEffect } from 'react';

import DateButtonGroup from './DateButtonGroup';

// ----------------------------------------------------------------------

export default function Toolbar() {
  const filter = useSelector(selectFilter);

  const buckets = useSelector(selectBuckets);
  const teams = useSelector(selectTeams);
  const assignees = useSelector(selectAssignees);

  useEffect(() => {
    dispatch(createFilter({ buckets, teams, assignees }));
  }, [buckets, teams, assignees]);

  function handleSave(filter: Filter<Task> | FilterItem<Task>) {
    if (isFilterItem(filter)) {
      dispatch(updateFilter(filter));
    }
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      <AdvancedFilter filter={filter} saveFilter={handleSave} />

      <DateButtonGroup />
    </Stack>
  );
}
