import { useCallback } from "react";

import useAuthProvider, { defaultAuthParams } from "./useAuthProvider";
import useLogout from './useLogout';
import { useNotify } from '../notification'
import { useBasename } from "../routing";
import { removeDoubleSlashes } from "../routing";

/** 
 * Get a callback for calling the authProvider.checkAuth() method.
 * In case of rejection, redirects to the login page, displays a notification,
 * and throw an error.
 * 
 * this is a low level hook, see those more specialized hooks for common authentication tasks,based on useCheckAuth.
 */
export const useCheckAuth = (): CheckAuth => {
  const authProvider = useAuthProvider();
  const notify = useNotify();
  const logout = useLogout();
  const basename = useBasename();
  const loginUrl = removeDoubleSlashes(
    `${basename}/${defaultAuthParams.loginUrl}`
  );

  const checkAuth = useCallback(
    (
      params: any = {},
      logoutOnFailure = true,
      redirectTo = loginUrl,
      disableNotification = false
    ) =>
      authProvider.checkAuth(params).catch(error => {
        if (logoutOnFailure) {
          logout(
            {},
            error && error.redirectTo
              ? error.redirectTo
              : redirectTo
          );
          const shouldSkipNotify =
            disableNotification ||
            (error && error.message === false);
          !shouldSkipNotify &&
            notify(
              getErrorMessage(error, 'ra.auth.auth_check_error'),
              { type: 'warning' }
            )
        }
        throw error;
      }),
    [authProvider, logout, notify, loginUrl]
  );
  return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
}

const checkAuthWithoutAuthProvider = () => Promise.resolve();

/**
 * Check if the current is authenticated by calling authProvider.checkAuth().
 * Logs the user out on failure.
 */
export type CheckAuth = (
  params?: any,
  logoutOnFailure?: boolean,
  redirectTo?: string,
  disableNotification?: boolean
) => Promise<any>;

const getErrorMessage = (error, defaultMessage) =>
  typeof error === 'string'
    ? error
    : typeof error === 'undefined' || !error.message
      ? defaultMessage
      : error.message;