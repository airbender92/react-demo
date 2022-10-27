import { useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'

import { useEventCallback } from '../util';
import { useStoreContext } from './useStoreContext'

export type useStoreResult<T = any> = [
  T,
  (value: T | ((value: T) => void), defaultValue?: T) => void
]

export const useStore = <T = any>(
  key: string,
  defaultValue?: T
): useStoreResult<T> => {
  const { getItem, setItem, subscribe } = useStoreContext();
  const [value, setValue] = useState(() => getItem(key, defaultValue))

  // subscribe to changes on this way, and change the state when they happen
  useEffect(() => {
    const storedValue = getItem(key, defaultValue);
    if (!isEqual(value, storedValue)) {
      setValue(storedValue)
    }
    const unsubscribe = subscribe(key, newValue => {
      setValue(typeof newValue === 'undefined' ? defaultValue : newValue);
    })
    return () => unsubscribe();
  }, [key, subscribe, defaultValue, getItem, value]);

  const set = useEventCallback(
    (valueParam: T, runtimeDefaultValue: T) => {
      const newValue =
        typeof valueParam === 'function'
          ? valueParam(value)
          : valueParam;
      // we only set the value in the Store;
      // the value in the local state will be updated
      // by the useEffect during the next render
      setItem(
        key,
        typeof newValue === 'undefined'
          ? typeof runtimeDefaultValue === 'undefined'
            ? defaultValue
            : runtimeDefaultValue
          : newValue
      );
    },
    [key, setItem, defaultValue, value]
  );
  return [value, set];
};
