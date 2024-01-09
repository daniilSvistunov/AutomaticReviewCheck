import { ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface WithChildren {
  children: NonNullable<ReactNode>;
}

export type Nullable<T> = T | null;

export type DateRange = {
  start: null | Date;
  end: null | Date;
};

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
