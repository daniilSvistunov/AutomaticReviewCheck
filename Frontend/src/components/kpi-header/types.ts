import { ContractType } from "@models/common";

import { KeyValuePairProps } from "../key-value-pair";
export { CompareValue } from "../key-value-pair"

export interface KPIHeaderProps {
  valuesLeft: ValueArray;
  valuesRight: ValueArray;
  diagramType: DiagramType;
  contractType: ContractType;
  showToggle: boolean[];
}

export enum DiagramType {
  linear = 'linear',
  circular = 'circular',
}

export interface KPICardProps {
  values: ValueArray;
  diagramType: DiagramType;
  toggleSwitch: boolean;
  contractType: ContractType;
}

export interface PieChartProps {
  values: ValueArray;
  toggleSwitch: boolean;
}

export type ValueArray = readonly [KeyValuePairProps] | readonly [KeyValuePairProps, KeyValuePairProps] | readonly [KeyValuePairProps, KeyValuePairProps, KeyValuePairProps];