import { Address } from '@models/assets';
import { Capacity } from '@models/capacity';
import { BillingOption, ContractType, InvoicingCycle, UnitAmountOfWork } from '@models/common';
import { ConsultingRole } from '@models/consultingRole';
import { Customer } from '@models/customer';
import { DaysOff } from '@models/daysOff';
import { Employee } from '@models/employee';
import { Milestone } from '@models/milestone';
import { Order, OrderDetails, OrderQuantity, OrderVolume } from '@models/order';
import { Team } from '@models/team';
import { TeamIteration } from '@models/teamIteration';

import {
  mockEmployee1,
  mockEmployee2,
  mockEmployee3,
  mockEmployee4,
  mockEmployee5,
  mockEmployee6,
  mockEmployee7,
  mockEmployee8,
  mockEmployee9,
  mockEmployee10,
  mockEmployee11,
  mockEmployee12,
} from './employees';

// ----------------------------------------------------------------------

const mockConsultingRoles: ConsultingRole[] = [
  {
    id: '8898ce9c-1ecc-47f7-b5bd-f102ddfa6191',
    orderId: 'bd12ddf4-1939-4e2b-4edf-08db35c01bbd',
    name: 'Project Leader',
    quantity: undefined,
    rate: 1000,
    customerNumber: '123',
    quantityTravelAllowance: undefined,
    rateTravelAllowance: undefined,
  },
  {
    id: '8298ce9c-1ecc-40f7-b5bd-f102ddfa3091',
    orderId: 'bd12ddf4-1939-4e2b-4edf-08db35c01bbd',
    name: 'Consultant',
    quantity: undefined,
    rate: 800,
    customerNumber: '456',
    quantityTravelAllowance: undefined,
    rateTravelAllowance: undefined,
  },
  {
    id: '2898ce5c-1ecc-47f7-b9bd-f102ddfa6191',
    orderId: 'bd12ddf4-1939-4e2b-4edf-08db35c01bbd',
    name: 'Developer',
    quantity: undefined,
    rate: 500,
    customerNumber: '789',
    quantityTravelAllowance: undefined,
    rateTravelAllowance: undefined,
  },
];

const mockMilestones1: Milestone[] = [];

export const mockTeam1: Team = {
  id: 'df4b18c6-fa58-4702-6217-08d8fdb4e931',
  name: 'Testname',
  devopsPath: 'string',
  projectName: 'Testprojekt Michael',
  msGroupId: 'd692312a-ec7d-434c-8ad3-ba2d2849792a',
  msPlannerId: 'hJq91VpjYkWXxEohRa6tlZYAAboD',
  scopingInterval: 48,
};

export const mockTeam2: Team = {
  id: 'cd922168-c9ba-49d2-9d50-84865ac748d1',
  name: 'Featuregroup Auftragsanlage Team',
  devopsPath: '\\ok-pua\\Featuregroup Auftragsanlage\\Featuregroup Auftragsanlage Team',
  projectName: 'Featuregroup Auftragsanlage Team',
  msGroupId: 'd692312a-ec7d-434c-8ad3-ba2d2849792a',
  msPlannerId: 'hJq91VpjYkWXxEohRa6tlZYAAboD',
  scopingInterval: 2,
};

const mockCustomer1: Customer = {
  id: '1075',
  name: 'Objekkultur Software GmbH',
  shortName: 'OK',
  targetCustomer: '',
  number: '1',
  internal: true,
};

const mockCustomer2: Customer = {
  id: '2be61d40-5979-492a-b9e3-08db3cc9b8d3',
  name: 'Bayerische Gesellschaft für Internationale Wirtschaftsbeziehungen mbH',
  shortName: 'BayInt',
  targetCustomer: 'Bayerische Gesellschaft für Internationale Wirtschaftsbeziehungen mbH',
  number: '1022',
  internal: true,
};

const mockAddress1: Address = {
  receiverLineOne: '',
  receiverLineTwo: '',
  receiverLineThree: '',
  zip: '76185',
  city: 'Karlsruhe',
  line1: '',
  country: 'Deutschland',
};

const mockAddress2: Address = {
  receiverLineOne: '',
  receiverLineTwo: '',
  receiverLineThree: '',
  zip: '76185',
  city: 'Karlsruhe',
  line1: '',
  country: '',
};

const mockOrderVolume: OrderVolume = {
  billedVolume: 20000,
  volumeInitial: 10000,
  plannedVolume: 40000,
  remainingVolume: 10000,
  volume: 50000,
};

const mockOrderQuantity: OrderQuantity = {
  billedQuantity: 40,
  plannedQuantity: 80,
  remainingQuantity: 40,
};

const mockDetails1: OrderDetails = {
  opportunityNumber: '',
  customerOrderNumber: '123',
  additionalText: 'Test',
  owner: mockEmployee1,
  coOwner: null,
  isActivityReportRequired: 'notRequired',
  dueDate: 14,
  tax: 19,
  orderVolume: mockOrderVolume,
  orderQuantity: mockOrderQuantity,
  travelCostAllowance: 0,
  travelCostBilled: 1000,
  isDeletable: false,
  isActive: true,
  address: mockAddress1,
  additionalReference: '',
  businessUnit: '',
  productGroup: 'Keine Zuordnung',
};

export const mockDetails2: OrderDetails = {
  opportunityNumber: '',
  customerOrderNumber: '',
  additionalText: '',
  owner: mockEmployee2,
  coOwner: null,
  isActivityReportRequired: 'notRequired',
  dueDate: 0,
  tax: 0,
  orderVolume: mockOrderVolume,
  orderQuantity: mockOrderQuantity,
  travelCostAllowance: 150,
  travelCostBilled: 250,
  isDeletable: false,
  isActive: true,
  address: mockAddress2,
  additionalReference: '',
  businessUnit: 'BU Florian',
  productGroup: 'Keine Zuordnung',
};

export const mockOrder1: Order = {
  id: 'bd12ddf4-1939-4e2b-4edf-08db35c01bbd',
  number: '1439-A0001',
  name: 'Testname',
  team: mockTeam1,

  details: mockDetails1,
  customer: mockCustomer1,

  contractType: ContractType.FixedPriceContract,
  invoicingCycle: InvoicingCycle.MonthlyInAdvance,
  unitAmountOfWork: UnitAmountOfWork.ManDays,
  billingOption: BillingOption.User,
  consultingRoles: mockConsultingRoles,
  milestones: mockMilestones1,
};

export const mockOrder2: Order = {
  id: '15d29426-46db-40bf-cb47-08db3fed4680',
  number: '1022-A0003',
  name: 'Test Michael',
  team: mockTeam2,

  details: mockDetails2,
  customer: mockCustomer2,

  contractType: ContractType.PerformanceContract,
  invoicingCycle: InvoicingCycle.MonthlyInArrears,
  unitAmountOfWork: UnitAmountOfWork.ManDays,
  billingOption: BillingOption.User,
  consultingRoles: mockConsultingRoles,
  milestones: mockMilestones1,
};

export const mockDaysOff: DaysOff = {
  id: '15f29426-46db-40bf-cb46-08db3fek4687',
  capacityId: '15d29426-46db-40bf-cb46-08db3fek4680',
  start: new Date(),
  end: new Date(),
};

// Capacities
// -----------------------------------------------------------------

// Iteration 1
// --------------------------------------------------------

const mockCapacity1: Capacity = {
  id: '22141bbe-5a06-4424-86bb-8345e12bea64',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee1.id,
  orderId: mockOrder1.id,
  teamIterationId: 'df4b18c6-fa58-4702-6217-08d8fdb4e932',
  capacityPerDay: 8,
  daysOffs: [mockDaysOff],
  plannedTurnover: 10000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity2: Capacity = {
  id: '667eefe4-e5f7-4e18-a63b-c0e622c5ce73',
  consultingRoleId: mockConsultingRoles[0].id,
  employeeId: mockEmployee2.id,
  orderId: mockOrder1.id,
  teamIterationId: 'df4b18c6-fa58-4702-6217-08d8fdb4e932',
  capacityPerDay: 7,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity3: Capacity = {
  id: '53a3db32-93e4-4bd3-8fb9-5e98899d2392',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee3.id,
  orderId: mockOrder1.id,
  teamIterationId: 'df4b18c6-fa58-4702-6217-08d8fdb4e932',
  capacityPerDay: 5,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};

// Iteration 2
// --------------------------------------------------------

const mockCapacity4: Capacity = {
  id: '79f14663-4a36-45f0-ae37-c98246877912',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee1.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d2',
  capacityPerDay: 8,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity5: Capacity = {
  id: '4a23613f-5d33-4497-a103-d7e233a70ec9',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee3.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d2',
  capacityPerDay: 7,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity6: Capacity = {
  id: 'd135a2fc-4f81-4d8d-8417-942f197832cc',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee4.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d2',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity7: Capacity = {
  id: 'b9e8bc04-e50f-4536-b9bf-432b44357720',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee7.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d2',
  capacityPerDay: 5,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};

// Iteration 3
// --------------------------------------------------------

const mockCapacity8: Capacity = {
  id: 'ef09a55d-a808-4a20-9686-bc59df688ef0',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee1.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d3',
  capacityPerDay: 8,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity9: Capacity = {
  id: '89067681-aa97-4978-b8f0-6e500f4e082e',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee3.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d3',
  capacityPerDay: 7,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity10: Capacity = {
  id: '68f44632-2ce8-4d4c-99bc-482a80ec3694',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee4.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d3',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};

// Iteration 4
// --------------------------------------------------------

const mockCapacity11: Capacity = {
  id: 'f010f2dc-3fc7-49dd-bb0f-cba263a0d038',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee1.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d4',
  capacityPerDay: 8,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 2,
  vacations: [],
  daysOff: 1,
};
const mockCapacity12: Capacity = {
  id: '361e27e5-a555-4d4a-8ce3-e80eaa0a871c',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee9.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d4',
  capacityPerDay: 7,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity13: Capacity = {
  id: '6274119a-8c9b-4542-84ad-baa6113f3918',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee12.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d4',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};

// Iteration 5
// --------------------------------------------------------

const mockCapacity14: Capacity = {
  id: '04079f29-b662-44e2-bbde-a05443fca3b4',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee1.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  capacityPerDay: 8,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 2,
  vacations: [
    {
      id: '1fb466fc-df33-11eb-ba80-0242ac130007',
      employeeId: mockEmployee1.id,
      start: new Date('12-5-2023'),
      end: new Date('12-6-2023'),
      vacationDays: 2,
    },
  ],
  daysOff: 1,
};
const mockCapacity15: Capacity = {
  id: '0840372b-23be-465e-a864-f574e5edece7',
  consultingRoleId: mockConsultingRoles[0].id,
  employeeId: mockEmployee2.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  capacityPerDay: 7,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 1,
  vacations: [
    {
      id: '1fb466fc-df33-11eb-ba80-0242ac130008',
      employeeId: mockEmployee2.id,
      start: new Date('12-5-2023'),
      end: new Date('12-5-2023'),
      vacationDays: 1,
    },
  ],
  daysOff: 1,
};
const mockCapacity16: Capacity = {
  id: '216c0af6-017e-4193-9064-ede83374728b',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee3.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity17: Capacity = {
  id: '7eb4acfc-2ce9-49c6-9234-fbc7d255d6d4',
  consultingRoleId: mockConsultingRoles[1].id,
  employeeId: mockEmployee4.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity18: Capacity = {
  id: '3f61626f-9ac7-4f67-85e0-3db853bb4011',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee5.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};
const mockCapacity19: Capacity = {
  id: '7cbe2951-e6f5-403d-a776-49184b9b7d9f',
  consultingRoleId: mockConsultingRoles[2].id,
  employeeId: mockEmployee6.id,
  orderId: mockOrder1.id,
  teamIterationId: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  capacityPerDay: 6,
  daysOffs: [mockDaysOff],
  plannedTurnover: 15000,
  vacationDays: 0,
  vacations: [],
  daysOff: 1,
};

// TeamIterations
// -----------------------------------------------------------------

const mockTeamIteration1: TeamIteration = {
  id: 'df4b18c6-fa58-4702-6217-08d8fdb4e932',
  teamId: mockTeam1.id,
  name: 'Sprint 2023 November 6-12',
  path: 'path',
  startDate: new Date('2023-11-06'),
  endDate: new Date('2023-11-12'),
  plannedEffort: 50,
  bookedEffort: 20,
  revenue: 12000,
  capacity: [mockCapacity1, mockCapacity2, mockCapacity3],
};
const mockTeamIteration2: TeamIteration = {
  id: 'cd922168-c9ba-49d2-9d50-84865ac748d2',
  teamId: mockTeam1.id,
  name: 'Sprint 2023 November 13-19',
  path: 'path',
  startDate: new Date('2023-11-13'),
  endDate: new Date('2023-11-19'),
  plannedEffort: 20,
  bookedEffort: 10,
  revenue: 8000,
  capacity: [mockCapacity4, mockCapacity5, mockCapacity6, mockCapacity7],
};
const mockTeamIteration3: TeamIteration = {
  id: 'cd922168-c9ba-49d2-9d50-84865ac748d3',
  teamId: mockTeam2.id,
  name: 'Sprint 2023 November 20-26',
  path: 'path',
  startDate: new Date('2023-11-20'),
  endDate: new Date('2023-11-26'),
  plannedEffort: 30,
  bookedEffort: 10,
  revenue: 3000,
  capacity: [mockCapacity8, mockCapacity9, mockCapacity10],
};
const mockTeamIteration4: TeamIteration = {
  id: 'cd922168-c9ba-49d2-9d50-84865ac748d4',
  teamId: mockTeam2.id,
  name: 'Sprint 2023 November 27-3',
  path: 'path',
  startDate: new Date('2023-11-27'),
  endDate: new Date('2023-12-03'),
  plannedEffort: 40,
  bookedEffort: 10,
  revenue: 4000,
  capacity: [mockCapacity11, mockCapacity12, mockCapacity13],
};
const mockTeamIteration5: TeamIteration = {
  id: 'cd922168-c9ba-49d2-9d50-84865ac748d5',
  teamId: mockTeam2.id,
  name: 'Sprint 2023 Dezember 4-10',
  path: 'path',
  startDate: new Date('2023-12-04'),
  endDate: new Date('2023-12-10'),
  plannedEffort: 50,
  bookedEffort: 10,
  revenue: 5000,
  capacity: [
    mockCapacity14,
    mockCapacity15,
    mockCapacity16,
    mockCapacity17,
    mockCapacity18,
    mockCapacity19,
  ],
};
const mockTeamIteration6: TeamIteration = {
  id: 'cd922168-c9ba-49d2-9d50-84865ac748d7',
  teamId: mockTeam2.id,
  name: 'Sprint 2023 Dezember 11-17',
  path: 'path',
  startDate: new Date('2023-12-11'),
  endDate: new Date('2023-12-17'),
  plannedEffort: 0,
  bookedEffort: 0,
  revenue: 0,
  capacity: [],
};

export const mockCapacities: Capacity[] = [
  mockCapacity1,
  mockCapacity2,
  mockCapacity3,
  mockCapacity4,
  mockCapacity5,
  mockCapacity6,
  mockCapacity7,
  mockCapacity8,
  mockCapacity9,
  mockCapacity10,
  mockCapacity11,
  mockCapacity12,
  mockCapacity13,
  mockCapacity14,
  mockCapacity15,
  mockCapacity16,
  mockCapacity17,
  mockCapacity18,
  mockCapacity19,
];
export const mockListEntries: Order[] = [mockOrder1, mockOrder2];
export const mockEmployees: Employee[] = [
  mockEmployee1,
  mockEmployee2,
  mockEmployee3,
  mockEmployee4,
  mockEmployee5,
  mockEmployee6,
  mockEmployee7,
  mockEmployee8,
  mockEmployee9,
  mockEmployee10,
  mockEmployee11,
  mockEmployee12,
];
export const mockTeamIterations: TeamIteration[] = [
  mockTeamIteration1,
  mockTeamIteration2,
  mockTeamIteration3,
  mockTeamIteration4,
  mockTeamIteration5,
  mockTeamIteration6,
];
export const mockTeamsList: Team[] = [mockTeam1, mockTeam2];
export { mockConsultingRoles };
