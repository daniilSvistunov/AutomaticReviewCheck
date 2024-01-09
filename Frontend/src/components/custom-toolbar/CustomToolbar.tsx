import { Box, Stack, Toolbar } from '@mui/material';

import Additionals from './Additionals';
import More from './More';
import Tools from './Tools';
import { CustomToolbarProps } from './types';
import Workflow from './Workflow';

const CustomToolbar = ({
  name,
  tools,
  workflow,
  additionals,
  more,
  toolbarProps,
  stackProps,
}: CustomToolbarProps) => {
  return (
    <Toolbar sx={{ my: { xs: 2, sm: 1 }, width: 1 }} {...toolbarProps}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        spacing={{ xs: 2, sm: 1 }}
        sx={{ width: 1 }}
        {...stackProps}
      >
        {tools && <Tools name={name} items={tools} />}
        {workflow && <Workflow name={name} items={workflow} />}
        <Box sx={{ flexGrow: 1 }} />
        {additionals && <Additionals name={name} items={additionals} />}
        {more && more.length > 0 && <More name={name} items={more} />}
      </Stack>
    </Toolbar>
  );
};
export default CustomToolbar;
