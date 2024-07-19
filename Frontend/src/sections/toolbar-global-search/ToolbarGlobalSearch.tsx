import { SearchRounded } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { selectSearch, updateSearch } from '@redux/slices/filter';
import { useDispatch, useSelector } from '@redux/store';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function ToolbarGlobalSearch() {
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);

  const [open, setOpen] = useState(false);

  function handleBlur() {
    if (search === '') {
      setOpen(false);
    }
  }

  return (
    <>
      {open ? (
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
          onBlur={handleBlur}
          onChange={(event) => dispatch(updateSearch(event.target.value))}
          placeholder="Suche"
          size="small"
          value={search ?? ''}
        />
      ) : (
        <IconButton onClick={() => setOpen(true)}>
          <SearchRounded />
        </IconButton>
      )}
    </>
  );
}
