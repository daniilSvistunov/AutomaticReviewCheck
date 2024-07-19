import {
  type Filter,
  type FilterItem,
  AdvancedFilter,
  isFilterItem,
} from '@components/advanced-filter';
import { create, selectFilter, update } from '@redux/slices/filter';
import { type Task, selectAssignees, selectBuckets, selectTeams } from '@redux/slices/task';
import { dispatch, useSelector } from '@redux/store';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Toolbar() {
  const filter = useSelector(selectFilter);

  const buckets = useSelector(selectBuckets);
  const teams = useSelector(selectTeams);
  const assignees = useSelector(selectAssignees);

  useEffect(() => {
    dispatch(create({ buckets, teams, assignees }));
  }, [buckets, teams, assignees]);

  function handleSave(filter: Filter<Task> | FilterItem<Task>) {
    if (isFilterItem(filter)) {
      dispatch(update(filter));
    }
  }

  return <AdvancedFilter filter={filter} saveFilter={handleSave} />;
}
