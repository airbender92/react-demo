import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

/**
 * Hook for triggering a page refresh. Returns a callback function.
 * 
 * the callback invalidates all queries and refreshs the active ones.
 * any component depending on react-query data will be re-rendered
 */
export const useRefresh = () => {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries()
  }, [queryClient])
}