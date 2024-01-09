import { ReactNode } from 'react';

export type CustomErrorBoundaryProps = {
  children?: ReactNode;
  fallbackComponent: ReactNode;
  error?: string | Error | null;
};

export type ErrorBoundaryProps = {
  children?: ReactNode;
  fallbackComponent: ReactNode;
};

export type ErrorFallbackUiProps = {
  error?: string | Error | null;
};

export type ReThrowErrorProps = {
  error?: string | Error | null;
  children?: ReactNode;
};
