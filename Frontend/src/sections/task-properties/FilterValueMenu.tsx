import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { type MouseEvent, type ReactNode, useState } from 'react';

// ----------------------------------------------------------------------

interface Props {
  icon: ReactNode;
  label: string;
  values: string[];
  selected?: string;
  onSelect: (value: string) => void;
}

// ----------------------------------------------------------------------

export default function FilterValueMenu({
  icon,
  label,
  values,
  selected,
  onSelect,
}: Readonly<Props>) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  function handleClick(value: string) {
    onSelect(value);

    setAnchor(null);
  }

  return (
    <div>
      <Button
        color="inherit"
        endIcon={<KeyboardArrowDownRounded />}
        onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)}
        size="small"
        startIcon={icon}
        variant="outlined"
      >
        {selected ?? label}
      </Button>

      <Menu anchorEl={anchor} onClose={() => setAnchor(null)} open={Boolean(anchor)}>
        {values.map((item) => (
          <MenuItem key={item} onClick={() => handleClick(item)} selected={item === selected}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
