import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type ConsultingRole = BaseModel & {
  orderId: string;
  name: string;
  rate: number | '';
  quantity: number | undefined;
  customerNumber: string;
  quantityTravelAllowance: number | undefined;
  rateTravelAllowance: number | undefined;
};
