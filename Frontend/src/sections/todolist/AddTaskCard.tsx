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
import { Icon, Input, InputAdornment, Popover, Typography } from '@mui/material';
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
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  //   const CalenderPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleCalender = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popover' : undefined;

  return (
    <StyledCard sx={{ marginBottom: '20px' }}>
      <StyledToolbarStack margin={'0px 30px 0px 30px'}>
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
          <StyledFilterStack direction={'row'} justifyContent={'start'} gap={'10px'}>
            <FilterChips onClick={handleCalender}>
              <Icon fontSize="small" sx={{ display: 'flex' }}>
                <CalendarToday />
              </Icon>
              <Typography>Fällig bis</Typography>
            </FilterChips>

            {[
              { icon: <Notifications />, label: 'Erinnerung', dropdown: true },
              { icon: <PriorityHigh />, label: 'Priorität', dropdown: true },
              { icon: <Bookmark />, label: 'Bucket', dropdown: true },
              { icon: <Group />, label: 'Termin', dropdown: true },
              { icon: <Person />, label: 'Zuweisen an', dropdown: true },
            ].map(({ icon, label, dropdown }) => (
              <FilterChips key={label} onClick={handleFilter}>
                <Icon fontSize="small" sx={{ display: 'flex' }}>
                  {icon}
                </Icon>
                <Typography>{label}</Typography>
                {dropdown && (
                  <Icon
                    fontSize="small"
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <ArrowDropDown />
                  </Icon>
                )}
              </FilterChips>
            ))}
            <Popover
              id={id}
              open={open}
              anchorEl={anchor}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <FilterValueMenu />
            </Popover>
          </StyledFilterStack>
          <StyledFilterStack direction={'row'} justifyContent={'end'}>
            <ButtonGroupAdd>
              <Icon
                fontSize="small"
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                }}
              >
                <Add />
              </Icon>
              <Typography>Hinzufügen</Typography>
            </ButtonGroupAdd>
          </StyledFilterStack>
        </StyledFilterStack>
      </StyledToolbarStack>
    </StyledCard>
  );
}
