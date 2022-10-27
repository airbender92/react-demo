import { useMemo } from 'react';
import { useQuery, UseQueryOptions} from 'react-query'
import useAuthProvider from './useAuthProvider';

const emptyParams = {};
/**
 * Hook for getting user permissions
 * 
 * calls the authProvider.getPermissions() method using react-query.
 * if the authProvider returns a rejected promise, returns empty permissions
 * 
 * the return value updates according to the request state:
 * 
 * - start: { isLoading: true }
 * - success: { permissions: [any], isLoading: false }
 * - error: {error: [error from provider], isLoading: false}
 */
const usePermissions = <Permissions = any, Error = any>(
  params = emptyParams,
  queryParams: UseQueryOptions<Permissions, Error> = {
    staleTime: 5 * 60 * 1000,
  }
) => {
  const authProvider = useAuthProvider();

  const result = useQuery(
    ['auth', 'getPermissions', params],
    authProvider
      ? () => authProvider.getPermissions(params)
      : async () => [],
    queryParams
  );

  return useMemo(() => {
    return {
      permissions: result.data,
      isLoading: result.isLoading,
      error: result.error,
    };
  }, [result])
};

export default usePermissions;