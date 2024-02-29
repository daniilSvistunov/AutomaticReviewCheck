import useLocalStorage from '@hooks/useLocalStorage';
import { Button } from '@mui/material';
import { FC, useState } from 'react';

import { IconToggleButtonProps } from './types';

const IconToggleButton: FC<IconToggleButtonProps> = ({ ...props }) => {
  const { initialToggleState, IconComponent } = props;
  // TODO: Unnötige Typen definiert (Bezeichnung)
  const { initialIcon: InitialIcon, secondIcon: SecondIcon } = IconComponent;
  // const InitialIcon = IconComponent,
  //   SecondIcon = IconComponent;
  // Hier den default Wert auf 'false' gesetzt, wenn kein boolean Wert übergeben wird
  // TODO: dieser state sollte global sein also im redux store verlagern
  const [isToggled, setIsToggled] = useState<boolean>(initialToggleState ?? false);
  const [settings, setSettings] = useLocalStorage('settings', {});

  // light or dark mode settings
  // TODO: Settings in redux Storage auslagern und
  const newSettings = {
    themeMode: isToggled ? 'dark' : 'light',
    themeDirection: 'ltr',
    themeContrast: 'default',
    themeLayout: 'vertical',
    themeColorPresets: 'default',
    themeStretch: true,
  };

  const handleOnClick = () => {
    setIsToggled(!isToggled);
    // TODO: folgenden beiden Zeilen gehören nicht hierher -> Dispatcher packen
    localStorage.setItem('settings', JSON.stringify(settings));
    setSettings(newSettings);
    // TODO:
    // window.location.reload(); // sehr schlecht -> state verändert sich
  };

  // return <Button onClick={handleOnClick}>{isToggled ? { initialIcon } : <secondIcon />}</Button>;
  return <Button onClick={handleOnClick}>{!isToggled ? <InitialIcon /> : <SecondIcon />}</Button>;
};

export default IconToggleButton;
