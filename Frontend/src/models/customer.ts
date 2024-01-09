import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type Customer = BaseModel & {
  name: string;
  shortName: string;
  targetCustomer: string;
  number: string;
  internal: boolean;
};

export type CustomerDto = Pick<Customer, 'name' | 'shortName' | 'targetCustomer' | 'number'> & {
  id?: string;
  internal?: boolean;
};
