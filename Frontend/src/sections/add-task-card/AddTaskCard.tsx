import { AddRounded } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { type Properties, postTask } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { FilterChips } from '@sections/task-properties';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AddTaskCard() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [properties, setProperties] = useState<Properties>({ due: new Date() });

  function handleSubmit() {
    dispatch(postTask({ title, ...properties }));

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

      <CardActions sx={{ justifyContent: 'space-between', pb: 3, px: 3 }}>
        <FilterChips onSelect={setProperties} properties={properties} />

        <Button onClick={handleSubmit} size="small" startIcon={<AddRounded />} variant="contained">
          Hinzufügen
        </Button>
      </CardActions>
    </Card>
  );
}
