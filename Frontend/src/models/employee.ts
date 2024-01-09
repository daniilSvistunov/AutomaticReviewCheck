import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type Employee = BaseModel & {
  name: string;
  email: string;
  avatarUrl: string;
  isActive: boolean;
  msLocalAccountId: string;
};

//  ----------------- INITIAL VALUES FOR AUTOCOMPLETE

export const initialProjectLeader: Employee = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  isActive: true,
  msLocalAccountId: '',
};
