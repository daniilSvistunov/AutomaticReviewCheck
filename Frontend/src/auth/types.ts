import { AccountInfo } from '@azure/msal-browser';

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  account: AccountInfo | undefined;
};

// ----------------------------------------------------------------------

export type AuthContextType = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  account: AccountInfo | undefined;
  logout: () => Promise<void>;
  login: () => Promise<void>;
};
