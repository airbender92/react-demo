import { useEffect } from "react";
import isEqual from "lodash/isEqual";

import  useGetPermissions  from "./useGetPermissions";
import { useSafeSetState } from '../util/hooks';

interface State {
  permissions?: any;
  error?: any;
}

const emptyParams = {};

// keep a cache of already fetched permissions to initialize state for new
// components and avoid a useless rerender if the permissions havent changed
const alreadyFetchedPermissions = { '{}': undefined };

/**
 * Hook for getting user permissions without the loading state.
 * 
 * when compared to usePermissions, this hook doesn't cause a re-render
 * when the permissions haven't changed since the last call
 * 
 * this hook doesn't handle the loading state
 */
const usePermissionsOptimized = (params = emptyParams) => {
  const key = JSON.stringify(params);
  const [state, setState] = useSafeSetState<State>({
    permissions: alreadyFetchedPermissions[key],
  });
  const getPermissions = useGetPermissions();
  useEffect(() => {
    getPermissions(params)
      .then(permissions => {
        if (!isEqual(permissions, state.permissions)) {
          alreadyFetchedPermissions[key] = permissions;
          setState({ permissions })
        }
      })
      .catch(error => {
        setState({ error })
      })
  }, [getPermissions, key]);
  return state;
};
export default usePermissionsOptimized;