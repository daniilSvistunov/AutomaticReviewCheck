import { AccountInfo } from '@azure/msal-browser';

export type AuthStateType = {
  isAuthenticated: boolean;
  account: AccountInfo | undefined;
};

// ----------------------------------------------------------------------

export type AuthContextType = {
  isInitialized: boolean;
  account: AccountInfo | undefined;
};
