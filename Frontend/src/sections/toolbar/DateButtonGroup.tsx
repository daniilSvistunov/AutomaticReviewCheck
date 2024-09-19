import { i18n } from '@locales';
import { CheckRounded } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { DateFilter, selectDate, updateDate } from '@redux/slices/filter';
import { useDispatch, useSelector } from '@redux/store';

export default function DateButtonGroup() {
  const dispatch = useDispatch();

  const date = useSelector(selectDate);
  return (
    <Stack direction="row" spacing={1}>
      {Object.values(DateFilter).map((item) => (
        <Button
          color={item === date ? 'primary' : 'inherit'}
          key={item}
          onClick={() => dispatch(updateDate(item))}
          size="small"
          startIcon={item === date ? <CheckRounded /> : undefined}
          variant="outlined"
        >
          {`${i18n.t('task.date_buttons.' + item)}`}
        </Button>
      ))}
    </Stack>
  );
}
