import { FilterValue } from './types';

export function containsOnlyNull(filterItem: FilterValue): boolean {
  if (Array.isArray(filterItem)) {
    for (const item of filterItem) {
      if (item !== null) {
        return false;
      }
    }
  }
  return true;
}
