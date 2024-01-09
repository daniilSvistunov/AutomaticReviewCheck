export const isAppRunningInIframe = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (_err) {
    return true;
  }
};

