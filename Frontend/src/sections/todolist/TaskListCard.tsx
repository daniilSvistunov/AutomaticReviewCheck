import { ReportProblemRounded } from '@mui/icons-material';
import { Icon, Typography } from '@mui/material';
import { useState } from 'react';

import { StyledCard, StyledToolbarStack } from './styles';

export default function TaskListCard() {
  const [hasContent, setContent] = useState(false);

  return (
    <StyledCard>
      {!hasContent && (
        <StyledToolbarStack alignItems={'center'} rowGap={'5px'}>
          <Icon fontSize="small">
            <ReportProblemRounded />
          </Icon>
          <Typography>Keine Inhalte</Typography>
          <Typography>Klicke hier um eine neue Aufgabe hinzuzufügen</Typography>
        </StyledToolbarStack>
      )}
    </StyledCard>
  );
}
