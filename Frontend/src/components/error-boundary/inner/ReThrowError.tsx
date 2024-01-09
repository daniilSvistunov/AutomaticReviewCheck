import { useEffect } from 'react';

import { ReThrowErrorProps } from '../types';

export function ReThrowError({ error }: ReThrowErrorProps) {
  useEffect(() => {
    if (error) {
      if (typeof error == 'string') {
        throw new Error(error);
      } else {
        throw new Error(error.message);
      }
    }
  }, [error]);
  return <></>;
}
