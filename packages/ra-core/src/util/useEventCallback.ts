import * as React from 'react';
import { useCallback } from 'react';

// allow the hook to work in SSR
const useLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export const useEventCallback = <Args extends unknown[], Return> (
  fn: (...args: Args) => Return,
    dependencies: any[]
): ((...args: Args) => Return) => {
  const ref = React.useRef<(...args: Args) => Return>(() => {
    throw new Error('Cannot call an envet handler while rendering')
  });
  
  useLayoutEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback((...args: Args) => ref.current(...args), []);
}