import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type User = BaseModel & {
  msaadObjectId: string;
  displayName: string;
  email: string;
  photoUrl: string | null;
  abbreviation: string;
};
