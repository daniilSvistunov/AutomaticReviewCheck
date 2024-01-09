import { BaseModel } from './base';
import { MilestoneState } from './common';
import { Feature } from './feature';
import { TeamIteration } from './teamIteration';

// ----------------------------------------------------------------------

export type Milestone = BaseModel & {
  orderId: string;
  invoiceId: string | null;
  name: string;
  customerOrderNumber: string;
  volume: number | '';
  state: MilestoneState;
  dailyRateSold: number;
  completedOn: Date | null;
  features: Feature[];
  teamIterations: TeamIteration[];
};
