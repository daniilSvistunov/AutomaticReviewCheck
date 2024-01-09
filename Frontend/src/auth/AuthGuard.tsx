import { LoadingScreenContainer } from '../components/loading-screen';
import useAuthContext from './useAuthContext';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isInitialized, isAuthenticated } = useAuthContext();

  const isDone = isInitialized && isAuthenticated;

  if (!isDone) {
    return <LoadingScreenContainer />;
  }

  return <>{children}</>;
}
