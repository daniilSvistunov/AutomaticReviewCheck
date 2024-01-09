import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type DaysOff = BaseModel & {
  capacityId: string;
  start: Date;
  end: Date;
};
