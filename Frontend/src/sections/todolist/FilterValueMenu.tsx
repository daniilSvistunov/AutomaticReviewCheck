import { CheckBox, CheckBoxOutlineBlankRounded, Search as SearchIcon } from '@mui/icons-material';
import { Icon, Input, InputAdornment, Typography } from '@mui/material';
import { useState } from 'react';

import { StyledCard, StyledSearchFormControl, StyledToolbarStack } from './styles';

export default function FilterValueMenu() {
  const filterValue = new Map<number, string>();
  filterValue.set(1, 'Filter Value');
  filterValue.set(2, 'Filter Value');
  filterValue.set(3, 'Filter Value');
  filterValue.set(4, 'Filter Value');
  filterValue.set(5, 'Filter Value');

  const [iconClicked, setIconClicked] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleToggle = (value: number) => {
    setCheckedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  //const checked = checkedItems.includes(value);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
    alert('working');
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
          {filterValue.forEach((key, value) => {<StyledToolbarStack
              onClick={() => handleToggle(key)}
              key={value}
              direction={'row'}
              marginLeft={1}
              marginBottom={1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Icon fontSize="medium" sx={{ cursor: 'pointer' }}>
                {checked ? <CheckBox /> : <CheckBoxOutlineBlankRounded />}
                {/* <CheckBoxOutlineBlankRounded /> */}
              </Icon>
              <Typography marginLeft={2}>{value}</Typography>
            </StyledToolbarStack>})}
          
          
          {filterValue.map((value: string, key: number) => (
            
          ))}
        </StyledToolbarStack>
      </StyledToolbarStack>
    </StyledCard>
  );
}
