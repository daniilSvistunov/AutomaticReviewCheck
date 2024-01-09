import { ContractType } from "@models/common";
import { Box, Paper, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles';

import KeyValuePair from "../key-value-pair"
import PieChartWithLabel from "./PieChartWithLabel";
import { DiagramType, KPICardProps } from "./types";

function KPICard(props: KPICardProps) {
  const { palette } = useTheme()
  const { values, diagramType, toggleSwitch, contractType } = props
  const cardSx = {
    backgroundColor: palette.grey[200],
    pl: 3,
    pr: 3,
    pt: 1,
    pb: 1,
    width: '100%',
    borderRadius: 2,
  };
  
  // const hasSecondary = 'secondaryValue' in values[0] && 'secondaryValue' in values[1];

  // TODO implement Variant with LinearProgress

  return (
    <Paper sx={cardSx} elevation={0}>
      <Stack direction='row' spacing={3} width='100%' alignItems='center'>
        <Stack direction='column' spacing={1} width='100%'>
          {values.map((item) => 
              (<KeyValuePair
                key={item.id}
                id={item.id}
                label={item.label}
                primaryValue={item.primaryValue}
                secondaryValue={item.secondaryValue}
                compare={item.compare}
              />)
          )}
        </Stack>
        {(contractType !== ContractType.InternalProject && contractType !== ContractType.InvestmentProject) ? (
          <Box>
            {/* {(diagramType === DiagramType.linear) ? <LinearProgress variant="determinate" value={diagValue} /> : null} */}
            {(diagramType === DiagramType.circular) ? 
            <PieChartWithLabel values={props.values} toggleSwitch={toggleSwitch} /> : null}
          </Box>) : null}
        
      </Stack>
    </Paper>
  )
}

export default KPICard