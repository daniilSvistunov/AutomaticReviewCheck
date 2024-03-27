import i18n from '@locales/i18n';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Container, Stack, styled } from '@mui/system';
import { setImportanceFilter, setStringFilter } from '@redux/slices/list';
import { useDispatch, useSelector } from '@redux/store';
import { useState } from 'react';

function Filter() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const [val, setVal] = useState({ value: '' });
  function setFilterVal(value: string) {
    val.value = value;
    dispatch(setStringFilter({ string_filter: val.value, importance_filter: undefined }));
  }
  function sortTodos() {
    list.tasks = [...list.tasks].sort((a, b) => a.Date.localeCompare(b.Date));
  }

  function getSelectedValue(importance: number | undefined) {
    if (importance === 0) {
      importance = undefined;
    }
    dispatch(setImportanceFilter({ string_filter: '', importance_filter: importance }));
  }

  return (
    <Stack direction={'row'} spacing={1} sx={{ alignItems: 'center' }}>
      <TextField
        variant="outlined"
        size="small"
        value={val.value}
        label={`${i18n.t('common.placeholders.search')}`}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFilterVal(event.target.value);
        }}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>{`${i18n.t('todoList.importance')}`}</InputLabel>
        <Select
          defaultValue={0}
          onChange={(e: SelectChangeEvent) => {
            getSelectedValue(e.target.value);
          }}
          MenuProps={{
            style: { zIndex: 35001 },
          }}
        >
          {i18n
            .t('todoList.importanceSelect.filterSelect', { returnObjects: true })
            .map((option: string, index: number) => (
              <MenuItem key={option} value={index}>
                {option}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
export default Filter;
//    <Button  variant="contained" onChange={sortTodos}>sort</Button>
