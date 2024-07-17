import { AddRounded } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { type Properties, create } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { FilterChips } from '@sections/task-properties';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AddTaskCard() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [properties, setProperties] = useState<Properties>({});

  function handleSubmit() {
    dispatch(create({ title, ...properties }));

    setTitle('');
  }

  return (
    <Card>
      <CardContent>
        <TextField
          fullWidth
          label="Aufgaben Titel"
          onChange={(event) => setTitle(event.target.value)}
          required
          size="small"
          sx={{ maxWidth: 'sm' }}
          value={title}
        />
      </CardContent>

      <CardActions sx={{ pb: 3, px: 3 }}>
        <FilterChips onSelect={setProperties} properties={properties} />

        <Button
          onClick={handleSubmit}
          size="small"
          startIcon={<AddRounded />}
          sx={{ ml: 'auto' }}
          variant="contained"
        >
          Hinzufügen
        </Button>
      </CardActions>
    </Card>
  );
}
