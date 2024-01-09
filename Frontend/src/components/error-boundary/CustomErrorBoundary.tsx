import ErrorBoundary from './inner/ErrorBoundary';
import { ReThrowError } from './inner/ReThrowError';
import { CustomErrorBoundaryProps } from './types';

function CustomErrorBoundary({ children, fallbackComponent, error }: CustomErrorBoundaryProps) {
  return (
    <ErrorBoundary fallbackComponent={fallbackComponent}>
      {error ? <ReThrowError error={error}>{children}</ReThrowError> : <>{children}</>}
    </ErrorBoundary>
  );
}

export default CustomErrorBoundary;
