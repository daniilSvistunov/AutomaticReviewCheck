import { Address } from '../models/assets';
import { BaseModel } from './base';
import { BillingOption, ContractType, InvoicingCycle, UnitAmountOfWork } from './common';
import { ConsultingRole } from './consultingRole';
import { Customer } from './customer';
import { Employee } from './employee';
import { Milestone } from './milestone';
import { SalesOpportunity } from './salesOpportunity';
import { Team } from './team';

// ----------------------------------------------------------------------

export type ProductGroup = {
  produktgruppe: string;
};

export type OrderQuantity = {
  plannedQuantity: number;
  remainingQuantity: number;
  billedQuantity: number;
};

export type OrderVolume = {
  volume: number;
  volumeInitial: number;
  remainingVolume: number;
  plannedVolume: number;
  billedVolume: number;
};

export type OrderDetails = {
  opportunityNumber: string;
  customerOrderNumber: string;
  additionalText: string;
  owner: Employee;
  coOwner: Employee | null;
  isActivityReportRequired: 'required' | 'notRequired' | '';
  dueDate: number;
  tax: number;
  orderVolume: OrderVolume;
  orderQuantity: OrderQuantity;
  travelCostAllowance: number;
  travelCostBilled: number;
  isDeletable: boolean;
  isActive: boolean;
  address: Address;
  additionalReference: string;
  businessUnit: string;
  productGroup: string;
};

export type Order = BaseModel & {
  number: string;
  name: string;
  team: Team;

  details: OrderDetails;
  customer: Customer;

  contractType: ContractType;
  invoicingCycle: InvoicingCycle | ''; // TODO remove?
  unitAmountOfWork: UnitAmountOfWork | '';
  billingOption: BillingOption | '';
  consultingRoles: ConsultingRole[];
  salesOpportunity?: SalesOpportunity;
  milestones: Milestone[];
};

export const initialOrderVolume: OrderVolume = {
  volumeInitial: 0,
  billedVolume: 0,
  plannedVolume: 0,
  remainingVolume: 0,
  volume: 0,
};

export const initialOrderQuantity: OrderQuantity = {
  billedQuantity: 0,
  plannedQuantity: 0,
  remainingQuantity: 0,
};
