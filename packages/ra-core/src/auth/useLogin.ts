
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useNotificationContext } from '../notification'
import { useBasename } from '../routing'
import useAuthProvider, { defaultAuthParams } from './useAuthProvider';
import { removeDoubleSlashes } from '../routing/useCreatePath';

/**
 * Get a callback for calling the authProvider.login() method
 * and redirect to the previous authenticated page (or the home page) on success.
 */
const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const location = useLocation();
  const locationState = location.state as any;
  const navigate = useNavigate();
  const basename = useBasename();
  const { resetNotifications } = useNotificationContext()
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;
  const afterLoginUrl = removeDoubleSlashes(
    `${basename}/${defaultAuthParams.afterLoginUrl}`
  );

  const login = useCallback(
    (params: any = {}, pathName) =>
      authProvider.login(params).then(ret => {
        resetNotifications();
        if (ret && ret.hasOwnProperty('redirectTo')) {
          if (ret) {
            navigate(ret.redirectTo);
          }
        } else {
          const redirectUrl = pathName
            ? pathName
            : nextPathName + nextSearch || afterLoginUrl;
          navigate(redirectUrl)
        }
        return ret;
      }),
    [
      authProvider,
      navigate,
      nextPathName,
      nextSearch,
      resetNotifications,
      afterLoginUrl
    ]
  );

  const loginWithoutProvider = useCallback(
    (_, __) => {
      resetNotifications();
      navigate(afterLoginUrl);
      return Promise.resolve()
    },
    [navigate, resetNotifications, afterLoginUrl]
  );
  return authProvider ? login : loginWithoutProvider
};

/**
 * Log a user in by calling the authProvider.login() method
 */
type Login = (params: any, pathName?: string) => Promise<any>;

export default useLogin;