import { WarningRounded } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, Icon, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Task from './Task';

export default function TaskListCard() {
  const [hasContent, setContent] = useState(false);

  return (
    <Card>
      {!hasContent && (
        <CardActionArea>
          <CardContent>
            <Stack alignItems={'center'} mt={2}>
              <WarningRounded sx={{ color: 'text.secondary' }} />
              <Box textAlign={'center'} mt={1}>
                <Typography>Keine Inhalte</Typography>
                <Typography>Klicke hier um eine neue Aufgabe hinzuzufügen</Typography>
              </Box>
            </Stack>
            <Task></Task>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
}
