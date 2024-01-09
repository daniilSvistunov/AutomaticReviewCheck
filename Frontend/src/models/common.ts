import i18n from '../locales/i18n';
import { enumValuesAsNumbers } from '../utils/enum';

// Enums
// ----------------------------------------------------------------------

export enum ContractType {
  SupportContract,
  PerformanceContract,
  FixedPriceContract,
  InternalProject,
  PlanningProject,
  InvestmentProject,
}

export enum UnitAmountOfWork {
  ManDays,
  Quantity,
  Hours,
}
export enum InvoicingCycle {
  MonthlyInAdvance,
  MonthlyInArrears,
  QuarterlyInAdvance,
  QuarterlyMid,
  QuarterlyInArrears,
  YearlyInAdvance,
}

export enum MilestoneState {
  Billed,
  PartialBilling,
  Open,
  Planned,
  Active,
  Faulty,
}

export enum BillingOption {
  User,
  Team,
  Role,
  Feature,
}

export enum StateCode {
  OPEN,
  WON,
  CLOSED,
}

// Localization
// ----------------------------------------------------------------------

// Milestone
// ----------------------------------------------------------------------

export const localizeMilestoneState = (state: MilestoneState | '') => {
  const milestoneStateText = {
    [MilestoneState.Billed]: i18n.t('orders.details.milestones.state.billed'),
    [MilestoneState.PartialBilling]: i18n.t('orders.details.milestones.state.partialBilling'),
    [MilestoneState.Open]: i18n.t('orders.details.milestones.state.open'),
    [MilestoneState.Planned]: i18n.t('orders.details.milestones.state.planned'),
    [MilestoneState.Active]: i18n.t('orders.details.milestones.state.active'),
    [MilestoneState.Faulty]: i18n.t('orders.details.milestones.state.faulty'),
  };

  return state !== '' ? milestoneStateText[state] : state;
};

type MilestoneStateColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | undefined;

const milestoneStateColor: Record<MilestoneState, MilestoneStateColor> = {
  [MilestoneState.Active]: undefined,
  [MilestoneState.Billed]: 'success',
  [MilestoneState.Faulty]: 'error',
  [MilestoneState.Open]: undefined,
  [MilestoneState.PartialBilling]: 'secondary',
  [MilestoneState.Planned]: 'info',
};

export const getMilestoneStateColor = (state: MilestoneState) =>
  MilestoneState[state] !== undefined ? milestoneStateColor[state] : undefined;

type ContractTypeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | undefined;

const contractTypeColor: Record<ContractType, ContractTypeColor> = {
  [ContractType.PerformanceContract]: 'warning',
  [ContractType.FixedPriceContract]: undefined,
  [ContractType.SupportContract]: 'warning',
  [ContractType.InternalProject]: 'success',
  [ContractType.PlanningProject]: 'info',
  [ContractType.InvestmentProject]: 'success',
};

// ContractType
// ----------------------------------------------------------------------

export const localizeOrderContractType = (contractType: ContractType) => {
  const contractTypeText: { [K in ContractType]: string } = {
    [ContractType.SupportContract]: i18n.t('orders.contractType.text.support'),
    [ContractType.PerformanceContract]: i18n.t('orders.contractType.text.performance'),
    [ContractType.FixedPriceContract]: i18n.t('orders.contractType.text.fixedPrice'),
    [ContractType.InternalProject]: i18n.t('orders.contractType.text.internal'),
    [ContractType.PlanningProject]: i18n.t('orders.contractType.text.planning'),
    [ContractType.InvestmentProject]: i18n.t('orders.contractType.text.investment'),
  };

  return contractTypeText[contractType];
};

export const localizeAllOrderContractTypes = () => {
  return enumValuesAsNumbers(ContractType).map((value) =>
    localizeOrderContractType(value as ContractType)
  );
};

export const getContractTypeColor = (contractType: ContractType) =>
  ContractType[contractType] !== undefined ? contractTypeColor[contractType] : undefined;

// InvoicingCycle
// ----------------------------------------------------------------------

export const localizeInvoicingCycle = (cycle: InvoicingCycle | '') => {
  const invoiceCycleText = {
    [InvoicingCycle.MonthlyInAdvance]: i18n.t('orders.invoicingCycle.monthlyInAdvance'),
    [InvoicingCycle.MonthlyInArrears]: i18n.t('orders.invoicingCycle.monthlyInArrears'),
    [InvoicingCycle.QuarterlyInAdvance]: i18n.t('orders.invoicingCycle.quarterlyInAdvance'),
    [InvoicingCycle.QuarterlyMid]: i18n.t('orders.invoicingCycle.quarterlyMid'),
    [InvoicingCycle.QuarterlyInArrears]: i18n.t('orders.invoicingCycle.quarterlyInArrears'),
    [InvoicingCycle.YearlyInAdvance]: i18n.t('orders.invoicingCycle.yearly'),
  };

  return cycle !== '' ? invoiceCycleText[cycle] : cycle;
};

export const localizeAllInvoicingCycles = () => {
  return enumValuesAsNumbers(InvoicingCycle).map((value) =>
    localizeInvoicingCycle(value as InvoicingCycle)
  );
};

// BillingOption
// ----------------------------------------------------------------------

export const localizeBillingOption = (option: BillingOption | '') => {
  const optionText = {
    [BillingOption.User]: i18n.t('orders.billingOption.user'),
    [BillingOption.Team]: i18n.t('orders.billingOption.team'),
    [BillingOption.Role]: i18n.t('orders.billingOption.role'),
    [BillingOption.Feature]: i18n.t('orders.billingOption.feature'),
  };

  return option !== '' ? optionText[option] : option;
};

export const localizeAllBillingOptions = () => {
  return enumValuesAsNumbers(BillingOption).map((value) =>
    localizeBillingOption(value as BillingOption)
  );
};

// TypeOfUnit
// ----------------------------------------------------------------------

export const localizeTypeOfUnit = (type: UnitAmountOfWork | '') => {
  const typeText = {
    [UnitAmountOfWork.ManDays]: i18n.t('orders.unitAmountOfWork.manDays'),
    [UnitAmountOfWork.Quantity]: i18n.t('orders.unitAmountOfWork.quantity'),
    [UnitAmountOfWork.Hours]: i18n.t('orders.unitAmountOfWork.hours'),
  };

  return type !== '' ? typeText[type] : type;
};

export const localizeAllTypesOfUnits = () => {
  return enumValuesAsNumbers(UnitAmountOfWork).map((value) =>
    localizeTypeOfUnit(value as UnitAmountOfWork)
  );
};
