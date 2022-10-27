
import { useCallback } from "react";

import useAuthProvider from "./useAuthProvider";
import useLogout from "./useLogout";
import { useNotify } from "../notification";
import { useNavigate } from "react-router-dom";

let timer;

/**
 * Returns a callback used to call the authProvider.checkError() method
 * and an error from the dataProvider. if the authProvider rejects the call.
 * the hook logs the user out and shows a logged out notification
 * 
 * used in the useDataProvider hook to check for access denied responses
 * (e.g. 401 or 403 responses) and trigger a logout.
 */
const useLogoutIfAccessDenied = (): LogoutIfAccessDenied => {
  const authProvider = useAuthProvider();
  const logout = useLogout();
  const notify = useNotify();
  const navigate = useNavigate();
  const logoutIfAccessDenied = useCallback(
    (error?: any, disableNotification?: boolean) =>
      authProvider
        .checkError(error)
        .then(() => false)
        .catch(async e => {
          const logoutUser = e?.logoutUser ?? true;

          // manual debounce
          if (timer) {
            // side effects already triggered in this tick, exit
            return true;
          }
          timer = setTimeout(() => {
            timer = undefined
          }, 0);
          const shouldNotify = !(
            disableNotification ||
            (e && e.message === false) ||
            (error && error.message === false)
          );
          if (shouldNotify) {
            // notify only if not yet logged out
            authProvider
              .checkAuth({})
              .then(() => {
                if (logoutUser) {
                  notify(
                    getErrorMessage(
                      e,
                      'ra.notification.logged_out'
                    ),
                    { type: 'warning' }
                  );
                } else {
                  notify(
                    getErrorMessage(
                      e,
                      'ra.notification.not_authorized'
                    ),
                    { type: 'warning' }
                  );
                }
              })
              .catch(() => { })
          }
          const redirectTo =
            e && e.redirectTo
              ? e.redirectTo
              : error && error.redirectTo
                ? error.redirectTo
                : undefined;
          if (logoutUser) {
            logout({}, redirectTo);
          } else {
            navigate(redirectTo)
          }
          return true;
        }),
    [authProvider, logout, notify, navigate]
  );
  return authProvider
    ? logoutIfAccessDenied
    : logoutIfAccessDeniedWithoutProvider;
};

const logoutIfAccessDeniedWithoutProvider = () => Promise.resolve(false);

/**
 * Call the authProvider.authError() method, using the error passed as argument.
 * If the authProvider rejects the call, logs the user out and shows a logged out notification.
 */
type LogoutIfAccessDenied = (
  error?: any,
  /**@deprecated to disable the notification, authProvider.checkAuth() should return an object with an error property set to true */
  disableNotification?: boolean
) => Promise<boolean>;

const getErrorMessage = (error, defaultMessage) =>
  typeof error === 'string'
    ? error
    : typeof error === 'undefined' || !error.message
      ? defaultMessage
      : error.message;

export default useLogoutIfAccessDenied;