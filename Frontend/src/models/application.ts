import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type Application = BaseModel & {
  title: string;
  caption: string;
  url: string;
  svgIcon: string;
};
