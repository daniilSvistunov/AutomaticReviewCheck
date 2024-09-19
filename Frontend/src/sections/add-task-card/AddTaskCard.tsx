import { i18n } from '@locales';
import { AddRounded } from '@mui/icons-material';
import { Button, Card, CardContent, Input, InputAdornment } from '@mui/material';
import { FilterChips } from '@sections/task-properties';

import { StyledFilterStack } from '../todolist/styles';

export default function AddTaskCard() {
  return (
    <Card>
      <CardContent>
        <Input
          sx={{
            width: '549px',
            height: '40px',
            border: '1px solid grey',
            borderRadius: '10px',
            paddingLeft: '15px',
            marginBottom: '20px',
          }}
          aria-label="AufgabenTitel"
          id="AufgabenTitel"
          autoFocus
          placeholder="Aufgaben Titel"
          endAdornment={
            <InputAdornment
              position="end"
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            ></InputAdornment>
          }
        />
        <StyledFilterStack direction={'row'}>
          <FilterChips />
          <StyledFilterStack direction={'row'} justifyContent={'end'}>
            <Button size="small" startIcon={<AddRounded />} variant="contained">
              {`${i18n.t('common.add')}`}
            </Button>
          </StyledFilterStack>
        </StyledFilterStack>
      </CardContent>
    </Card>
  );
}
