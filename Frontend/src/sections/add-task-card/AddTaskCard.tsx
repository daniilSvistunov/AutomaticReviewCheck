import { AddRounded } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { create } from '@redux/slices/task';
import { useDispatch } from '@redux/store';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AddTaskCard() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  function handleSubmit() {
    dispatch(create({ title }));

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
