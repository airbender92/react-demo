import { DataProvider } from '../types';
import { defaultDataProvider } from './defaultDataProvider'

export type DataProviderMatcher = (resource: string) => DataProvider;

/**
 * Combine multiple data providers into one
 */
export const combineDataProviders = (
  dataProviderMatcher: DataProviderMatcher
): DataProvider =>
  new Proxy(defaultDataProvider, {
    get: (target, name) => {
      return (resource, params) => {
        if (typeof name === 'symbol' || name === 'then') {
          return
        }
        return dataProviderMatcher(resource)[name](resource, params);
      }
    }
  })