import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, styled, TableCell, TableRow } from '@mui/material';
import { SortTypes, todoSort } from '@redux/slices/todo';
import { dispatch, useSelector } from '@redux/store';

const StyledHeaderRow = styled(TableRow)(({ theme }) => ({
  paddingLeft: '15px',
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: 'black',
  color: 'white',
  fontSize: '25px',
  textAlign: 'center',
  textTransform: 'uppercase',
}));

export default function TodoHead() {
  const { sortingOrder } = useSelector((state) => state.todo.filter);

  return (
    <StyledHeaderRow>
      <StyledHeaderCell sx={{ width: '10%' }}>Status</StyledHeaderCell>
      <StyledHeaderCell sx={{ width: '55%' }}>
        <Box
          sx={{ cursor: 'pointer', margin: 'auto', width: 'fit-content' }}
          onClick={() =>
            dispatch(
              todoSort(
                sortingOrder === SortTypes.TaskAscending
                  ? SortTypes.TaskDescending
                  : SortTypes.TaskAscending
              )
            )
          }
        >
          Aufgabe
          {sortingOrder === SortTypes.TaskAscending && <ArrowDropDownIcon />}
          {sortingOrder === SortTypes.TaskDescending && <ArrowDropUpIcon />}
        </Box>
      </StyledHeaderCell>
      <StyledHeaderCell sx={{ width: '15%' }}>
        <Box
          sx={{ cursor: 'pointer', margin: 'auto', width: 'fit-content' }}
          onClick={() =>
            dispatch(
              todoSort(
                sortingOrder === SortTypes.DateAscending
                  ? SortTypes.DateDescending
                  : SortTypes.DateAscending
              )
            )
          }
        >
          Datum
          {sortingOrder === SortTypes.DateAscending && <ArrowDropDownIcon />}
          {sortingOrder === SortTypes.DateDescending && <ArrowDropUpIcon />}
        </Box>
      </StyledHeaderCell>
      <StyledHeaderCell sx={{ width: '20%' }}>Funktionen</StyledHeaderCell>
    </StyledHeaderRow>
  );
}
