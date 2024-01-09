import { Typography } from '@mui/material';

import { useLocales } from '../../locales';
import { AddressPreviewProps } from './types';

const AddressPreview = ({ address, customerName }: AddressPreviewProps) => {
  const { translate } = useLocales();
  const { receiverLineOne, receiverLineTwo, receiverLineThree, line1, zip, city, country } =
    address;
  const isGermany = address.country == 'Deutschland' || address.country == 'D';
  return (
    <>
      <Typography paragraph variant="overline" sx={{ color: 'text.disabled', mb: 0.5 }}>
        {`${translate('orders.details.content.invoice.adressPreview')}`}
      </Typography>

      <Typography variant="body2">{customerName}</Typography>

      <Typography variant="body2">{receiverLineOne}</Typography>

      <Typography variant="body2">{receiverLineTwo}</Typography>

      <Typography variant="body2">{receiverLineThree}</Typography>

      <Typography variant="body2">{line1}</Typography>

      <Typography variant="body2">{zip + ' ' + city}</Typography>

      {!isGermany && <Typography variant="body2">{country}</Typography>}
    </>
  );
};

export default AddressPreview;
