import {
  BookmarkRounded,
  GroupRounded,
  PersonRounded,
  PriorityHighRounded,
} from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { type Properties as Props } from '@redux/slices/task';

// ----------------------------------------------------------------------

const StyledChip = styled(Chip)({ backgroundColor: 'transparent' });

export default function TaskPropertiesSizes({ priority, bucket, team, assignee }: Readonly<Props>) {
  return (
    <Stack direction="row">
      {priority && <StyledChip icon={<PriorityHighRounded />} label={priority} />}
      {bucket && <StyledChip icon={<BookmarkRounded />} label={bucket} />}
      {team && <StyledChip icon={<GroupRounded />} label={team} />}
      {assignee && <StyledChip icon={<PersonRounded />} label={assignee} />}
    </Stack>
  );
}
