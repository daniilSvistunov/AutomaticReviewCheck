/*
 * Filter values of Enum to only contain the integer values.
 *
 * @params
 * enumObject: A Typescript Enum
 */
export function enumValuesAsNumbers(enumObject: any): number[] {
  return Object.values(enumObject).filter((v) => !isNaN(Number(v))) as number[];
}
