import { applyAdvancedFilter } from '@components/advanced-filter/AdvancedFilter';
import { i18n } from '@locales';
import { WarningRounded } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, List, Stack, Typography } from '@mui/material';
import { DateFilter, selectDate, selectFilter, selectSearch } from '@redux/slices/filter';
import { type Task, selectList } from '@redux/slices/task';
import { useSelector } from '@redux/store';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

import { default as Item } from './Task';

// ----------------------------------------------------------------------

function searchFilter(list: Task[], search?: string): Task[] {
  if (search === undefined) {
    return list;
  }

  return list.filter((item) => item.title.includes(search));
}

function dateFilter(list: Task[], date: DateFilter): Task[] {
  return list.filter(({ checked, due }) => {
    switch (date) {
      case DateFilter.TODAY: {
        return isToday(due);
      }
      case DateFilter.WEEK: {
        return isThisWeek(due);
      }
      case DateFilter.MONTH: {
        return isThisMonth(due);
      }
      case DateFilter.DONE: {
        return checked;
      }
      default: {
        return true;
      }
    }
  });
}

export default function TaskListCard() {
  const list = useSelector(selectList);

  const search = useSelector(selectSearch);

  const date = useSelector(selectDate);

  const filter = useSelector(selectFilter);

  const filteredList = applyAdvancedFilter(dateFilter(searchFilter(list, search), date), filter);

  return (
    <Card>
      {list.length === 0 ? (
        <CardActionArea>
          <CardContent>
            <Stack sx={{ alignItems: 'center', mt: 2.25 }}>
              <WarningRounded sx={{ color: 'text.secondary' }} />

              <Box sx={{ mt: 0.75, textAlign: 'center' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }} variant="body2">
                  {`${i18n.t('task.empty')}`}
                </Typography>

                <Typography sx={{ color: 'primary.main', fontSize: 12 }} variant="caption">
                  {`${i18n.t('task.create')}`}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardContent>
          <List>
            {filteredList.map((task) => (
              <Item key={task.id} {...task} />
            ))}
          </List>
        </CardContent>
      )}
    </Card>
  );
}
