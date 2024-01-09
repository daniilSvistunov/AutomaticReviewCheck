import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type Vacation = BaseModel & {
  employeeId: string;
  start: Date;
  end: Date;
  vacationDays: number;
};
