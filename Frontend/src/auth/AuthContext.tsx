import { AccountInfo } from '@azure/msal-browser';
import { useAccount, useMsal } from '@azure/msal-react';
import { createContext, useEffect, useMemo, useState } from 'react';

import axiosInstance from '../api/axiosInstance';
import { loginRequest } from './MsalConfig';
import { AuthContextType, AuthStateType } from './types';

export type AuthProviderProps = {
  children: React.ReactNode;
};

// CONTEXT
// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType | null>(null);

// MSAL
// ----------------------------------------------------------------------

export const MsalAuth = ({ children }: AuthProviderProps) => {
  const { instance, accounts } = useMsal();
  const urlParamAccount = new URLSearchParams(window.location.search).get('account');
  const iframeAccount: AccountInfo = urlParamAccount ? JSON.parse(urlParamAccount) : undefined;

  const account = useAccount(iframeAccount ?? accounts[0] ?? {});

  const [accessToken, setAccessToken] = useState<null | string>(null);

  const initialState: AuthStateType = {
    isAuthenticated: false,
    account: undefined,
  };

  const [state, setState] = useState(initialState);

  const getAccessToken = async () => {
    if (!account) {
      return;
    }
    const request = {
      ...loginRequest,
      account,
    };
    return instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
      // Set http client authorization header
      axiosInstance.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${response.accessToken}`;
        return config;
      });
    });
  };

  useEffect(() => {
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, account]);

  useEffect(() => {
    setState({
      isAuthenticated: !!accessToken,
      account: account ?? undefined,
    });
  }, [accessToken, account, instance]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
    }),
    [state]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};
