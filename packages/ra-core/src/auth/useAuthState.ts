import { useEffect } from 'react';

import { useCheckAuth } from './useCheckAuth'
import { useSafeSetState } from '../util/hooks'

interface State {
  isLoading: boolean;
  authenticated?: boolean;
}

const emptyParams = {};

/**
 * Hook for getting the authentication status
 * 
 * calls the authProvider.checkAuth() method asynchronously.
 * 
 * the return value updates according to the authProvider request sate:
 * - isloading: true just after mount, while the authProvider is being called. false once the authProvider has answered.
 * - authenticated: true while loading. then true or false depending on the authProvider response.
 * 
 * To avoid rendering a component and force waiting for the authProvider response, use the useAuthState() hook
 * instead of the useAuthenticated() hook.
 * 
 * you can render different content depending on the authenticated status.
 */
const useAuthState = (
  params: any = emptyParams,
  logoutOnFailure: boolean = false
): State => {
  const [state, setState] = useSafeSetState({
    isLoading: true,
    authenticated: true,
  });
  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth(params, logoutOnFailure)
      .then(() => setState({ isLoading: false, authenticated: true }))
      .catch(() => setState({ isLoading: false, authenticated: false }))
  }, [checkAuth, params, logoutOnFailure, setState]);
  return state;
}

export default useAuthState;