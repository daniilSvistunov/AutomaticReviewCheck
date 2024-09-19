import {
  Close as CloseIcon,
  ReportProblemRounded,
  Search as SearchIcon,
  SearchRounded,
} from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
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
        <Card>
          <CardActionArea>
            <CardContent>
              <Stack alignItems={'center'} gap={2}>
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
                    <InputAdornment position="start">
                      <SearchRounded />
                      <CloseIcon
                        onClick={() => {
                          setToggleSearch(false);
                          //setEmployeeToSearch('');
                        }}
                      />
                    </InputAdornment>
                  }
                />

                <ReportProblemRounded />
                <Typography>Keine Suchergebnisse</Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}
