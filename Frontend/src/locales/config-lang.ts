import { deDE, enUS } from '@mui/material/locale';
import { de, enUS as enUS_ } from 'date-fns/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    dateFns: enUS_,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'German',
    value: 'de',
    systemValue: deDE,
    dateFns: de,
    icon: '/assets/icons/flags/ic_flag_de.svg',
  },
];

export const defaultLang = allLangs[1];
