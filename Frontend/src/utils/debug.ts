
/// Just a function to indicate to us humans that this branch should be unreachable.
/// If this function is ever reached, it should be considered an application bug, likely due to inconsitent data.
export function unreachable<T>(fallback: T): T {
  return fallback;
}
  
  