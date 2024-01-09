// ----------------------------------------------------------------------

export default function getPosition(arrow: string) {
  let props;
  const topRight = {
    style: { ml: 0.75 },
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
  };

  switch (arrow) {
    case 'top-left':
      props = {
        style: { ml: -0.75 },
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      };
      break;
    case 'top-center':
      props = {
        style: {},
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      };
      break;
    case 'top-right':
      props = topRight;
      break;
    case 'bottom-left':
      props = {
        style: { ml: -0.75 },
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      };
      break;
    case 'bottom-center':
      props = {
        style: {},
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        transformOrigin: { vertical: 'bottom', horizontal: 'center' },
      };
      break;
    case 'bottom-right':
      props = {
        style: { ml: 0.75 },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      };
      break;
    case 'left-top':
      props = {
        style: { mt: -0.75 },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      };
      break;
    case 'left-center':
      props = {
        anchorOrigin: { vertical: 'center', horizontal: 'right' },
        transformOrigin: { vertical: 'center', horizontal: 'left' },
      };
      break;
    case 'left-bottom':
      props = {
        style: { mt: 0.75 },
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      };
      break;
    case 'right-top':
      props = {
        style: { mt: -0.75 },
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      };
      break;
    case 'right-center':
      props = {
        anchorOrigin: { vertical: 'center', horizontal: 'left' },
        transformOrigin: { vertical: 'center', horizontal: 'right' },
      };
      break;
    case 'right-bottom':
      props = {
        style: { mt: 0.75 },
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      };
      break;

    // top-right
    default:
      props = topRight;
  }

  return props;
}
