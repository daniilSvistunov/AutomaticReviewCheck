import { Address } from '../models/assets';

const fAddress = (addr: Address | undefined) => {
  if (!addr) {
    return '';
  }

  let formattedAddress = '';

  if (addr.zip) {
    formattedAddress += `${addr.zip} `;
  }

  if (addr.city) {
    formattedAddress += `${addr.city} `;
  }

  if (addr.line1) {
    formattedAddress += `, ${addr.line1}`;
  }

  return formattedAddress;
};

export { fAddress };
