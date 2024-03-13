import 'react-lazy-load-image-component/src/effects/blur.css';
import 'simplebar-react/dist/simplebar.min.css';
import './locales/i18n';

import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
// ----------------------------------------------------------------------
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AuthProvider from './auth/AuthProvider';
import { msalConfig } from './auth/MsalConfig';
import { MotionLazyContainer } from './components/animate';
import { SettingsProvider, ThemeSettings } from './components/settings';
import SnackbarProvider from './components/snackbar/SnackbarProvider';
import { useLocales } from './locales';
import ThemeLocalization from './locales/ThemeLocalization';
import { persistor, store } from './redux/store';
import Router from './routes';
import ThemeProvider from './theme';
import { AppConnectorGateway } from './utils/app-connector';
import { isAppRunningInPlattform } from './utils/isAppRunningInPlattform';

// ----------------------------------------------------------------------
const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);

const App = () => {
  const { currentLang } = useLocales();

  return isAppRunningInPlattform() ? (
    // If the app is running in OKPlattform, use the OKPlattform theme
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLang.dateFns}>
            <SettingsProvider>
              <MotionLazyContainer>
                <SnackbarProvider>
                  <AuthProvider pca={msalInstance} interactionType={InteractionType.Silent}>
                    <AppConnectorGateway />
                    <Router />
                  </AuthProvider>
                </SnackbarProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  ) : (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLang.dateFns}>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeSettings>
                    <ThemeLocalization>
                      <SnackbarProvider>
                        <AuthProvider pca={msalInstance} interactionType={InteractionType.Redirect}>
                          <AppConnectorGateway />
                          <Router />
                        </AuthProvider>
                      </SnackbarProvider>
                    </ThemeLocalization>
                  </ThemeSettings>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  );
};

export default App;
