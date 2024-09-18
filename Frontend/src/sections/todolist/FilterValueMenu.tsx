import { CheckBox, CheckBoxOutlineBlankRounded, Search as SearchIcon } from '@mui/icons-material';
import { Icon, Input, InputAdornment, Typography } from '@mui/material';
import { useState } from 'react';

import { StyledCard, StyledSearchFormControl, StyledToolbarStack } from './styles';

export default function FilterValueMenu() {
  const [filterValues, setFilterValues] = useState([
    { name: 'Filter Value', checked: false },
    { name: 'Filter Value', checked: false },
    { name: 'Filter Value', checked: false },
    { name: 'Filter Value', checked: false },
    { name: 'Filter Value', checked: false },
  ]);
  const toggleCheckbox = (index: number) => {
    setFilterValues((prevValues) =>
      prevValues.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <StyledCard sx={{ width: '15rem', height: 'auto', justifyContent: 'start' }}>
      <StyledToolbarStack padding={2}>
        <StyledSearchFormControl variant="standard" sx={{ marginBottom: 2 }}>
          <SearchIcon sx={{ position: 'absolute', top: 11, left: 10 }} />
          <Input
            sx={{
              border: '1px solid lightgrey',
              borderRadius: 1,
              height: 45,
              width: 'auto',
              paddingLeft: 5,
            }}
            aria-label="searchEmployee"
            id="searchEmployee"
            autoFocus
            placeholder={`Suche`}
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
        </StyledSearchFormControl>
        <StyledToolbarStack justifyContent={'space-between'} alignItems={'start'}>
          {filterValues.map((filter, index) => (
            <StyledToolbarStack
              onClick={() => toggleCheckbox(index)}
              key={index}
              direction={'row'}
              marginLeft={1}
              marginBottom={1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Icon fontSize="medium" sx={{ cursor: 'pointer', display: 'flex' }}>
                {filter.checked ? <CheckBox /> : <CheckBoxOutlineBlankRounded />}
                <CheckBoxOutlineBlankRounded />
              </Icon>
              <Typography marginLeft={2}>{filter.name}</Typography>
            </StyledToolbarStack>
          ))}
        </StyledToolbarStack>
      </StyledToolbarStack>
    </StyledCard>
  );
}
