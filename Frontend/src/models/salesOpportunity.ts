import { StateCode } from './common';
import { CustomerDto } from './customer';
import { ProductGroup } from './order';

// ----------------------------------------------------------------------

export type SalesOpportunity = {
  okProjectNumber: string;
  name: string;
  state: StateCode;
  customer: CustomerDto;
  planningProjectId?: string;
  productGroup?: ProductGroup[];
};

//  ----------------- INITIAL VALUES FOR AUTOCOMPLETE

export const initialOpportunity: SalesOpportunity = {
  okProjectNumber: '',
  name: '',
  state: StateCode.OPEN,
  customer: {
    name: '',
    shortName: '',
    number: '',
    targetCustomer: '',
    internal: false,
  },
};
