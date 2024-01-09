import 'numeral/locales/de';

import numeral from 'numeral';

// ----------------------------------------------------------------------

numeral.locale('de');
numeral.localeData('de').delimiters.thousands = '.';

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  return numeral(number).format('0.[00000]');
}

export function fNumberDecimals(number: InputValue, decimals: number) {
  const format = `0.[${'0'.repeat(decimals)}]`;
  return numeral(number).format(format);
}

export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format('0,0.00 $') : '';

  return result(format, '.00');
}

export function fCurrencyValidNull(number: InputValue) {
  const format = numeral(number).format('0,0.00 $');

  return result(format, '.00');
}

export function fCurrencyValidNullNoSuffix(number: InputValue) {
  const format = numeral(number).format('0,0.00');

  return result(format, '.00');
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format('0.0 %') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.endsWith(key);

  return isInteger ? format.slice(0, -key.length) : format;
}
