import { useCallback } from 'react'

import useAuthProvider from './useAuthProvider'

const getPermissionsWithoutProvider = () => Promise.resolve([]);

/**
 * Get a callback for calling the authProvider.getPermissions() method.
 */
const useGetPermissions = (): GetPermissions => {
  const authProvider = useAuthProvider();
  const getPermissions = useCallback(
    (params: any = {}) => authProvider.getPermissions(params),
    [authProvider]
  );
  return authProvider ? getPermissions : getPermissionsWithoutProvider;
};

/**
 * proxy for calling authProvider.getPermissions()
 */
type GetPermissions = (params?: any) => Promise<any>;

export default useGetPermissions;