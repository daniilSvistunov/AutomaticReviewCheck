import { BaseModel } from './base';
import { Capacity } from './capacity';

// ----------------------------------------------------------------------

export type TeamIteration = BaseModel & {
  teamId: string;
  name: string;
  path: string;
  startDate: Date;
  endDate: Date;
  plannedEffort: number;
  bookedEffort: number;
  revenue: number;
  capacity: Capacity[];
};
