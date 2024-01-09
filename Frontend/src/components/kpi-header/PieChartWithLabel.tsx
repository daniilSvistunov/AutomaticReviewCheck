import { Button } from '@mui/material';
import { Palette, useTheme } from '@mui/material/styles';
import { useState } from 'react';

import Chart, { useChart } from '../chart';
import { CompareValue, PieChartProps, ValueArray } from './types';

function getValuesAndColors(values: ValueArray, palette: Palette, useSecondary: boolean) {
  const valueBlack = values.filter((value) => value.compare === CompareValue.black)[0];
  const valueGreen = values.filter((value) => value.compare === CompareValue.green)[0];
  const valueRed = values.filter((value) => value.compare === CompareValue.red)[0];
  const valueYellow = values.filter((value) => value.compare === CompareValue.yellow)[0];

  let percentage = 0;
  const colors = [palette.success.main, palette.error.main];
  if (valueBlack && valueRed) {
    const greenValue = Number(valueBlack.primaryValue.value) - Number(valueRed.primaryValue.value);
    percentage = Math.round((greenValue / Number(valueBlack.primaryValue.value)) * 100) || 0;
  }
  if (valueGreen && valueYellow) {
    const primaryValue = useSecondary
    ? valueGreen.secondaryValue?.value
    : valueGreen.primaryValue.value;
    const secondaryValue = useSecondary
    ? valueYellow.secondaryValue?.value
    : valueYellow.primaryValue.value;
    percentage =
    Math.round((Number(primaryValue) / (Number(primaryValue) + Number(secondaryValue))) * 100) ||
    0;
    colors[1] = palette.warning.main;
    return {
      colors,
      values: [Number(primaryValue), Number(secondaryValue)],
      percentage,
    };
  }

  return {
    colors: colors,
    values: [percentage, 100 - percentage],
    percentage: percentage,
  };
}

function PieChartWithCenterLabel(props: PieChartProps) {
  const { palette, typography } = useTheme();
  const { values: valuesProp, toggleSwitch } = props;
  const [useSecondary, setUseSecondary] = useState(false);
  const { values, colors, percentage } = getValuesAndColors(valuesProp, palette, useSecondary);
  
  const chartOptions = useChart({
    labels: [],
    stroke: {
      show: true,
      colors: [palette.background.neutral],
      width: 2,
    },
    colors: colors,
    dataLabels: {
      enabled: false,
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 13,
              color: palette.text.secondary,
              formatter() {
                return `%`;
              },
            },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: typography.fontWeightBold,
              offsetY: -15,
              formatter: function () {
                return `${percentage}`;
              },
            },
            total: {
              show: true,
              formatter: function () {
                return `${percentage}`;
              },
            },
          },
        },
      },
    },
  });
  return (
  <>
    <Chart type="donut" series={values} options={chartOptions} width={120} />
    { toggleSwitch ? (
      <Button 
        variant="text"
        sx={{
          position: 'absolute',
          top: 216,
          right: 10,
          transform: 'translate(-50%, -50%)',
          color: palette.text.secondary,
        }}
        size="small"
        onClick={() => setUseSecondary(!useSecondary)}
        disabled
      >
        { toggleSwitch ? valuesProp[0].primaryValue?.suffix : valuesProp[0].primaryValue.suffix }
      </Button>
    ) : null }
  </>
  );
}

export default PieChartWithCenterLabel;
