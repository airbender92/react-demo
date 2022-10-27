import { useEffect } from "react";
import { useCheckAuth } from './useCheckAuth'

/**
 * Restrict access to authenticated users.
 * redirect anoymous users to the login page.
 * 
 * use it in your custom page components to require
 * authentication.
 * 
 * you can set additional `authParams` at will if your authProvider requires it
 */
export const useAuthenticated = <ParamsType = any>(
  options: UseAuthenticatedOptions<ParamsType> = {}
) => {
  const { enabled = true, params = emptyParams } = options;
  const checkAuth = useCheckAuth();
  useEffect(() => {
    if (enabled) {
      checkAuth(params).catch(() => { });
    }
  }, [checkAuth, enabled, params])
};

export type UseAuthenticatedOptions<ParamsType> = {
  enabled?: boolean;
  params?: ParamsType;
}

const emptyParams = {};