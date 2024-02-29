// ----------------------------------------------------------------------

import { SvgIconProps } from '@mui/material';
import { ElementType } from 'react';

// TODO: remove this type
// type iconTypes = 'Brightness6Icon' | 'LightModeIcon';

// TODO: find out which props do i need for my custom icon component
export type IconToggleButtonProps = {
  // iconTypes: iconTypes;
  initialToggleState?: boolean;
  IconComponent: {
    initialIcon: ElementType<SvgIconProps>;
    secondIcon: ElementType<SvgIconProps>;
  };
  // IconComponent: ElementType<SvgIconProps>;
};
