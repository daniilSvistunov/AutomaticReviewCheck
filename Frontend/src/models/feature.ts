import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type Feature = BaseModel & {
  number: number;
  name: string;
  state: 'New' | 'Active' | 'Resolved' | 'Closed';
  effort: number;
  startDate: Date | null;
  targetDate: Date | null;
  estimatedEffort: number;
  bookedEffort: number;
  revenue: number;
};
