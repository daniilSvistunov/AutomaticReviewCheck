import { StyledCard } from '@components/settings/styles';
import {
  Close as CloseIcon,
  ReportProblemRounded,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Icon, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import { width } from '@mui/system';
import { useState } from 'react';

import { StyledSearchFormControl, StyledToolbarStack } from './styles';

export default function ToolbarGlobalSearch() {
  const [toggleSearch, setToggleSearch] = useState(false);

  return (
    <>
      {!toggleSearch && (
        <IconButton onClick={() => setToggleSearch(true)}>
          <SearchIcon />
        </IconButton>
      )}
      {toggleSearch && (
        <StyledCard selected={true} sx={{ width: 'auto', height: 'auto', padding: 1 }}>
          <StyledToolbarStack alignItems={'center'} justifyContent={'start'} gap={2}>
            <StyledSearchFormControl variant="standard">
              <SearchIcon sx={{ position: 'absolute', top: 11, left: 10 }} />
              <Input
                sx={{
                  border: '1px solid lightgrey',
                  borderRadius: 1,
                  height: 45,
                  minWidth: 300,
                  paddingLeft: 5,
                }}
                aria-label="searchEmployee"
                id="searchEmployee"
                //onChange={handleSearchBarToggle}
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
                  >
                    <CloseIcon
                      onClick={() => {
                        setToggleSearch(false);
                        //setEmployeeToSearch('');
                      }}
                    />
                  </InputAdornment>
                }
              />
            </StyledSearchFormControl>
            <Icon fontSize="small">
              <ReportProblemRounded />
            </Icon>
            <Typography>Keine Suchergebnisse</Typography>
          </StyledToolbarStack>
        </StyledCard>
      )}
    </>
  );
}
