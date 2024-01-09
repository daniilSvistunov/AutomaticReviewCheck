import { Stack } from '@mui/material';

import KPICard from './KPICard';
import { KPIHeaderProps } from './types';

function KPIHeader(props: KPIHeaderProps) {
  // TODO improve naming
  const { valuesLeft, valuesRight, diagramType, showToggle, contractType } = props;

  return (
    <Stack direction="row" spacing={2} sx={{ pt: 2, pr: 3, pl: 3 }}>
      <KPICard values={valuesLeft} diagramType={diagramType} contractType={contractType} toggleSwitch={showToggle[0]}/>
      <KPICard values={valuesRight} diagramType={diagramType} contractType={contractType} toggleSwitch={showToggle[1]}/>
    </Stack>
  );
}

export default KPIHeader;
