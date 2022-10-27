import { useCallback } from 'react';
import { useStoreContext } from './useStoreContext'

export const useRemoveFromStore = (hookTimeKey?: string) => {
  const { removeItem } = useStoreContext();
  return useCallback(
    (key?: string) => {
      if (
        typeof key === 'undefined' &&
        typeof hookTimeKey === 'undefined'
      ) {
        throw new Error(
          'You must provide a key to remove an item from the store'
        )
      }
      return removeItem(key ?? hookTimeKey)
    },
    [removeItem, hookTimeKey]
  )
}