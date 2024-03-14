// import useLocalStorage from '@hooks/useLocalStorage';
import { Button } from '@mui/material';
import { FC, useState } from 'react';

import { IconToggleButtonProps } from './types';

const IconToggleButton: FC<IconToggleButtonProps> = ({ ...props }) => {
  const { initialToggleState, changeToggleState, IconComponent } = props;
  // TODO: Unnötige Typen definiert (Bezeichnung)
  const { initialIcon: InitialIcon, secondIcon: SecondIcon } = IconComponent;
  // const InitialIcon = IconComponent,
  //   SecondIcon = IconComponent;
  // Hier den default Wert auf 'false' gesetzt, wenn kein boolean Wert übergeben wird
  // TODO: dieser state sollte global sein also im redux store verlagern
  const [isToggled, setIsToggled] = useState<boolean>(initialToggleState ?? false);

  const handleOnClick = () => {
    // changeToggleState ? changeToggleState(!isToggled) : setIsToggled(!isToggled);
    setIsToggled(!isToggled);
    // TODO: Vermeidung von dieser Funktion, da sie nicht in der Komponente sein sollte
    changeToggleState && changeToggleState(!isToggled);
  };

  // return <Button onClick={handleOnClick}>{isToggled ? { initialIcon } : <secondIcon />}</Button>;
  return <Button onClick={handleOnClick}>{!isToggled ? <InitialIcon /> : <SecondIcon />}</Button>;
};

export default IconToggleButton;
