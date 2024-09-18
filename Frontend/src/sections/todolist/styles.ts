import { Box, Button, Card, FormControl, Stack, styled } from '@mui/material';
import { color } from '@mui/system';

const StyledCard = styled(Card)(() => ({
  height: '150px',
  width: '100vh',
  justifyContent: 'space-between',
  alignContent: 'center',
}));

const StyledToolbarBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 'auto',
  //backgroundColor: theme.palette.background.neutral,
  height: 48,
}));

const StyledToolbarStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'space-between',
  flexGrow: 1,
  flexWrap: 'wrap',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down(700)]: {
    justifyContent: 'space-between',
  },
}));

const StyledFilterStack = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  flexGrow: 1,
  flexWrap: 'wrap',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down(700)]: {
    justifyContent: 'space-between',
  },
}));

const StyledSearchStack = styled(Stack)(() => ({
  width: '100vh',
  marginRight: '1rem',
  justifyContent: 'flex-end',
  alignContent: 'center',
  flexWrap: 'wrap',
}));

const StyledSearchFormControl = styled(FormControl)(() => ({
  '.MuiInputBase-root.MuiInput-root': {
    display: 'flex',
    justifyContent: 'end',
    margin: 0,
    transition: 'transform 3s ease-in-out',
  },
  '& .MuiFormControl-root.MuiFormControl-root': {
    margin: 0,
  },
}));

const ButtonGroupDate = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  color: theme.palette.grey[800],
  border: '1px solid lightgrey',
  padding: '8px 16px',
  textTransform: 'none',
}));

const FilterChips = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  width: '10rem',
  color: theme.palette.grey[800],
  border: '1px solid lightgrey',
  padding: '8px 16px',
  textTransform: 'none',
}));

const ButtonGroupAdd = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  width: '8rem',
  backgroundColor: 'rgba(0, 171, 85, 1)',
  color: 'white',
  padding: '8px 16px',
  textTransform: 'none',
}));

const FilterChipsValue = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  width: '10rem',
  backgroundColor: 'rgba(0, 171, 85, 1)',
  borderRadius: '1rem',
  color: 'white',
  padding: '8px 16px',
  textTransform: 'none',
}));

const FilterButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  width: '8rem',
  color: theme.palette.grey[800],
  border: '1px solid lightgrey',
  textTransform: 'none',
}));

export {
  ButtonGroupAdd,
  ButtonGroupDate,
  FilterButton,
  FilterChips,
  FilterChipsValue,
  StyledCard,
  StyledFilterStack,
  StyledSearchFormControl,
  StyledSearchStack,
  StyledToolbarBox,
  StyledToolbarStack,
};
