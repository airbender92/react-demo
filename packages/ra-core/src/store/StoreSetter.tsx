import * as React from 'react';
import { useEffect, ReactNode } from 'react';
import { useStoreContext } from './useStoreContext'

export const StoreSetter = ({ value, name, children }: StoreSetterProps) => {
  const { setItem } = useStoreContext();

  useEffect(() => {
    setItem(name, value);
  }, [name, setItem, value]);
  return <>{children}</>
};

export interface StoreSetterProps {
  name: string;
  value: any;
  children: ReactNode;
}