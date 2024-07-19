import { applyAdvancedFilter } from '@components/advanced-filter/AdvancedFilter';
import { WarningRounded } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, List, Stack, Typography } from '@mui/material';
import { DateFilter, selectDate, selectFilter } from '@redux/slices/filter';
import { type Task, selectList } from '@redux/slices/task';
import { useSelector } from '@redux/store';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

import { default as Item } from './Task';

// ----------------------------------------------------------------------

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

  const date = useSelector(selectDate);

  const filter = useSelector(selectFilter);

  const filteredList = applyAdvancedFilter(dateFilter(list, date), filter);

  return (
    <Card>
      {list.length === 0 ? (
        <CardActionArea>
          <CardContent>
            <Stack sx={{ alignItems: 'center', mt: 2.25 }}>
              <WarningRounded sx={{ color: 'text.secondary' }} />

              <Box sx={{ mt: 0.75, textAlign: 'center' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }} variant="body2">
                  Keine Inhalte
                </Typography>

                <Typography sx={{ color: 'primary.main', fontSize: 12 }} variant="caption">
                  Klicke hier um eine neue Aufgabe hinzuzufügen
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardContent>
          <List>
            {filteredList.map((task) => (
              <Item key={task.ID} {...task} />
            ))}
          </List>
        </CardContent>
      )}
    </Card>
  );
}
