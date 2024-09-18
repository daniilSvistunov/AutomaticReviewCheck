import {
  Add,
  ArrowDropDown,
  Bookmark,
  CalendarToday,
  Group,
  Notifications,
  Person,
  PriorityHigh,
} from '@mui/icons-material';
import { Icon, Input, InputAdornment, Popover } from '@mui/material';
import { useState } from 'react';

import FilterValueMenu from './FilterValueMenu';
//import { setFilter } from '../../redux/slices/application';
import {
  ButtonGroupAdd,
  FilterChips,
  StyledCard,
  StyledFilterStack,
  StyledToolbarStack,
} from './styles';

export default function AddTaskCard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <StyledCard>
      <StyledToolbarStack margin={'0px 30px 0px 30px'}>
        <Input
          sx={{
            width: '30vh',
            height: '50px',
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
          <StyledFilterStack direction={'row'} justifyContent={'start'} gap={'10px'}>
            {[
              { icon: <CalendarToday />, label: 'Fällig bis' },
              { icon: <Notifications />, label: 'Erinnerung', dropdown: true },
              { icon: <PriorityHigh />, label: 'Priorität', dropdown: true },
              { icon: <Bookmark />, label: 'Bucket', dropdown: true },
              { icon: <Group />, label: 'Termin', dropdown: true },
              { icon: <Person />, label: 'Zuweisen an', dropdown: true },
            ].map(({ icon, label, dropdown }) => (
              <FilterChips key={label} onClick={handleClick}>
                <Icon fontSize="small" sx={{ marginRight: '8px' }}>
                  {icon}
                </Icon>
                <p>{label}</p>
                {dropdown && (
                  <Icon fontSize="small">
                    <ArrowDropDown />
                  </Icon>
                )}
              </FilterChips>
            ))}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {/* <FilterValueMenu /> */}
            </Popover>
          </StyledFilterStack>
          <StyledFilterStack direction={'row'} justifyContent={'end'}>
            <ButtonGroupAdd>
              <Icon fontSize="small">
                <Add />
              </Icon>
              <p>Hinzufügen</p>
            </ButtonGroupAdd>
          </StyledFilterStack>
        </StyledFilterStack>
      </StyledToolbarStack>
    </StyledCard>
  );
}
