import { applyAdvancedFilter } from '@components/advanced-filter/AdvancedFilter';
import { WarningRounded } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, List, Stack, Typography } from '@mui/material';
import { selectFilter } from '@redux/slices/filter';
import { selectList } from '@redux/slices/task';
import { useSelector } from '@redux/store';

import Task from './Task';

// ----------------------------------------------------------------------

export default function TaskListCard() {
  const list = useSelector(selectList);

  const filter = useSelector(selectFilter);

  const filteredList = applyAdvancedFilter(list, filter);

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
              <Task key={task.ID} {...task} />
            ))}
          </List>
        </CardContent>
      )}
    </Card>
  );
}
