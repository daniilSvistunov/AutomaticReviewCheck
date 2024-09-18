import { DeleteOutlined, FilterList } from '@mui/icons-material';
import { Icon, IconButton, Typography } from '@mui/material';
import { useDispatch } from '@redux/store';
import { useState } from 'react';

import {
  ButtonGroupDate,
  FilterButton,
  StyledFilterStack,
  StyledToolbarBox,
  StyledToolbarStack,
} from './styles';
import ToolbarGlobalSearch from './ToolbarGlobalSearch';

type Props = {
  setEmployeeToSearch: (arg: string) => void;
};

export default function ToolBar({ setEmployeeToSearch }: Props) {
  const dispatch = useDispatch();

  const [toggleSearch, setToggleSearch] = useState(false);

  const handleSearchBarToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeToSearch(event.target.value.toLowerCase());
  };

  const dateRange: string[] = ['Gesamt', 'Heute', 'Woche', 'Monat', 'Erledigt'];
  return (
    <StyledToolbarBox>
      {!toggleSearch && (
        <StyledToolbarStack direction={'row'} alignItems="center">
          <StyledFilterStack direction={'row'} justifyContent={'start'} gap={1}>
            <ToolbarGlobalSearch />
            <FilterButton>
              <Icon fontSize="small" sx={{ display: 'flex' }}>
                <FilterList />
              </Icon>
              <Typography>Filtern</Typography>
            </FilterButton>
          </StyledFilterStack>
          <StyledFilterStack direction={'row'} justifyContent={'end'} gap={'10px'}>
            <IconButton color="inherit">
              <DeleteOutlined />
            </IconButton>
            {dateRange.map((value: string) => (
              <ButtonGroupDate key={value}>
                <Typography>{value}</Typography>
              </ButtonGroupDate>
            ))}
          </StyledFilterStack>
        </StyledToolbarStack>
      )}
    </StyledToolbarBox>
  );
}
