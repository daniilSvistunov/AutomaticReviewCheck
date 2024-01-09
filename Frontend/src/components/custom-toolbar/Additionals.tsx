import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Button, ButtonProps, IconButtonProps, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { CustomToolbarAdditionalsProps } from './types';

const Additonals = ({ name, items }: CustomToolbarAdditionalsProps) => {
  const isIconButton = (
    button: ButtonProps | LoadingButtonProps | IconButtonProps
  ): button is IconButtonProps => (button as IconButtonProps).edge !== undefined;

  const isLoadingButton = (
    button: ButtonProps | LoadingButtonProps | IconButtonProps
  ): button is LoadingButtonProps => (button as LoadingButtonProps).loading !== undefined;

  return (
    <Stack direction="row" spacing={1}>
      <>
        {items.map((item, index) => {
          if (item.Element) {
            return (
              <item.Element
                key={
                  item.Element.defaultProps?.key ??
                  item.Element.defaultProps?.children?.toString() ??
                  `${name}-additionals-item-${index}`
                }
              />
            );
          }

          if (item.props) {
            return (
              (isIconButton(item.props) && <IconButton key={item.props.name} {...item.props} />) ||
              (isLoadingButton(item.props) && (
                <LoadingButton key={item.props.name} {...item.props} />
              )) || <Button key={item.props.name} {...(item.props as ButtonProps)} />
            );
          }
        })}
      </>
    </Stack>
  );
};
export default Additonals;
