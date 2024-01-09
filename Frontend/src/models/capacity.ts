import { BaseModel } from './base';
import { DaysOff } from './daysOff';
import { Vacation } from './vacation';

// ----------------------------------------------------------------------

export type Capacity = BaseModel & {
  consultingRoleId: string;
  employeeId: string;
  orderId: string;
  teamIterationId: string;
  capacityPerDay: number;
  daysOffs: DaysOff[];
  plannedTurnover: number;
  vacationDays: number;
  daysOff: number;
  vacations: Vacation[]; 
};
