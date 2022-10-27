import { useEffect } from 'react';
import useAuthProvider from './useAuthProvider';
import { UserIdentity } from '../types';
import { useSafeSetState } from '../util/hooks';

const defaultIdentity = {
  id: '',
  fullName: null,
};

/**
 * Return the current user identity by calling authProvider.getIdentity() on mount
 * 
 * the return value updates according to the call state:
 * - mount: { isLoading: true }
 * - success: {identity: Identity, isLoading: false}
 * - error: {error: Error, isLoading: false}
 */
const useGetIdentity = () => {
  const [state, setState] = useSafeSetState<State>({
    isLoading: true,
  });
  const authProvider = useAuthProvider();
  useEffect(() => {
    if (authProvider && typeof authProvider.getIdentity === 'function') {
      const callAuthProvider = async () => {
        try {
          const identity = await authProvider.getIdentity();
          setState({
            isLoading: false,
            identity: identity || defaultIdentity
          });
        } catch (error) {
          setState({
            isLoading: false,
            error,
          })
        }
      };
      callAuthProvider()
    } else {
      setState({
        isLoading: false,
        identity: defaultIdentity
      })
    }
  }, [authProvider, setState]);
  return state;
};

interface State {
  isLoading: boolean;
  identity?: UserIdentity;
  error?: any
};
export default useGetIdentity;