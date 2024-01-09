import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Button, ButtonProps, IconButtonProps, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { CustomToolbarWorkflowProps } from './types';

const Workflow = ({ name, items }: CustomToolbarWorkflowProps) => {
  const isIconButton = (
    button: ButtonProps | LoadingButtonProps | IconButtonProps
  ): button is IconButtonProps => (button as IconButtonProps).edge !== undefined;

  const isLoadingButton = (
    button: ButtonProps | LoadingButtonProps | IconButtonProps
  ): button is LoadingButtonProps => (button as LoadingButtonProps).loading !== undefined;

  return (
    <Stack direction="row" spacing={0.5}>
      <>
        {items.map((item, index) => {
          const styling = {
            ...(items.length > 1 && {
              ...((index === 0 && {
                borderTopRightRadius: '2px',
                borderBottomRightRadius: '2px',
              }) ||
                (index === items.length - 1 && {
                  borderTopLeftRadius: '2px',
                  borderBottomLeftRadius: '2px',
                }) || { borderRadius: '2px' }),
            }),
          };

          if (item.Element) {
            return (
              <item.Element
                key={
                  item.Element.defaultProps?.key ??
                  item.Element.defaultProps?.children?.toString() ??
                  `${name}-workflow-item-${index}`
                }
                sx={styling}
              />
            );
          }

          if (item.props) {
            return (
              (isIconButton(item.props) && (
                <IconButton key={item.props.name} {...item.props} sx={styling} />
              )) ||
              (isLoadingButton(item.props) && (
                <LoadingButton key={item.props.name} {...item.props} sx={styling} />
              )) || <Button key={item.props.name} {...(item.props as ButtonProps)} sx={styling} />
            );
          }
        })}
      </>
    </Stack>
  );
};
export default Workflow;
