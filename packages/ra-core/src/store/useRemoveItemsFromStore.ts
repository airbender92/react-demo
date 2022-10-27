import { useCallback  } from "react";
import { useStoreContext } from "./useStoreContext";

export const useRemoveItemsFromStore = (hookTimeKeyPrefix?: string) => {
  const { removeItems } = useStoreContext();
  return useCallback(
    (keyPrefix?: string) => {
      if (
        typeof keyPrefix === 'undefined' &&
        typeof hookTimeKeyPrefix === 'undefined'
      ) {
        throw new Error(
          'You must provide a key to remove an item from the store'
        );
      }
      return removeItems(keyPrefix ?? hookTimeKeyPrefix)
    },
    [removeItems, hookTimeKeyPrefix]
  )
}