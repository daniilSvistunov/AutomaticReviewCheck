export const isAppRunningInPlattform = (): boolean => {
  return location.origin === import.meta.env.VITE_OKPLATTFORM_URL;
};
