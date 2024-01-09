import { BaseModel } from './base';

// ----------------------------------------------------------------------

export type Team = BaseModel & {
  name: string;
  devopsPath: string;
  projectName: string;
  msGroupId: string;
  msPlannerId: string;
  scopingInterval: number;
};

//  ----------------- INITIAL VALUES FOR AUTOCOMPLETE

export const initialTeam: Team = {
  id: '',
  name: '',
  devopsPath: '',
  projectName: '',
  msGroupId: '',
  msPlannerId: '',
  scopingInterval: 0,
};
