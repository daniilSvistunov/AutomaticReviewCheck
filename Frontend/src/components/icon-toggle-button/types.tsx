// ----------------------------------------------------------------------

import { SvgIconProps } from '@mui/material';
import { ElementType } from 'react';

// TODO: find out which props do i need for my custom icon component
export type IconToggleButtonProps = {
  // iconTypes: iconTypes;
  initialToggleState?: boolean;
  changeToggleState?: (isToggled: boolean) => void;
  IconComponent: {
    initialIcon: ElementType<SvgIconProps>;
    secondIcon: ElementType<SvgIconProps>;
  };
  // IconComponent: ElementType<SvgIconProps>;
};
