/* eslint-disable react/no-multi-comp */
import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionStatus,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalProvider, useAccount, useMsal, useMsalAuthentication } from '@azure/msal-react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import axiosInstance from '../api/axiosInstance';
import { loginRequest, msalConfig } from './MsalConfig';
import { AuthContextType, AuthStateType } from './types';

// CONTEXT
// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType | null>(null);

// MSAL
// ----------------------------------------------------------------------

const MsalAuth = ({ children }: AuthProviderProps) => {
  const { instance, inProgress, accounts } = useMsal();
  const urlParamAccount = new URLSearchParams(window.location.search).get('account');
  const iframeAccount: AccountInfo = urlParamAccount ? JSON.parse(urlParamAccount) : undefined;

  const account = useAccount(iframeAccount ?? accounts[0] ?? {});

  const {
    login: loginMsal,
    error,
    result,
    acquireToken,
  } = useMsalAuthentication(InteractionType.Silent, {
    ...loginRequest,
    account: iframeAccount ?? account ?? {},
  });

  const [accessToken, setAccessToken] = useState<null | string>(null);

  const initialState: AuthStateType = {
    isInitialized: false,
    isAuthenticated: false,
    account: undefined,
  };
  const [state, setState] = useState(initialState);

  const getAccessToken = useCallback(async () => {
    if (!account) {
      return null;
    }

    const request = {
      ...loginRequest,
      account,
    };

    return await acquireToken(InteractionType.Silent, request)
      .then((response) => {
        return response?.accessToken;
      })
      .catch(() => {
        acquireToken(InteractionType.Popup, request).then((response) => {
          return response?.accessToken;
        });
      });
    // aquireToken is excluded from the dependency array because we don't get a stable reference from useMsalAuthentication
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // Set token to axios
  const setToken = useCallback(
    async (token?: string) => {
      if (!token) {
        token = (await getAccessToken()) ?? '';
      }

      if (token) {
        axiosInstance.interceptors.request.use(async (config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
        setAccessToken(token);
      }
    },
    [getAccessToken]
  );

  useEffect(() => {
    if (state.isInitialized) {
      setToken();
    }
  }, [setToken, state.isInitialized]);

  useEffect(() => {
    if (result) {
      setToken(result.accessToken);
    }
  }, [result, setToken]);

  // LOGIN
  const login = useCallback(async () => {
    await loginMsal(InteractionType.Popup, loginRequest);
  }, [loginMsal]);

  // LOGOUT
  const logout = useCallback(async () => {
    await instance.logoutPopup();
  }, [instance]);

  // LOGIN if InteractionType.Silent threw error
  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      login();
    }
  }, [error, login]);

  useEffect(() => {
    setState({
      isInitialized: inProgress !== InteractionStatus.Startup,
      isAuthenticated: !!accessToken,
      account: account ?? undefined,
    });
  }, [accessToken, account, inProgress]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [login, logout, state]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

// AUTH Provider
// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  msalInstance.initialize().then()

  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuth>{children}</MsalAuth>
    </MsalProvider>
  );
};
export default AuthProvider;

// ----------------------------------------------------------------------
