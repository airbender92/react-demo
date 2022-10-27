import { useContext, useMemo } from 'react';

import DataProviderContext from './DataProviderContext';
import { defaultDataProvider } from './defaultDataProvider';
import validateResponseFormat from './validateResponseFormat';
import { DataProvider } from '../types';
import useLogoutIfAccessDenied from '../auth/useLogoutIfAccessDenied';
import { reactAdminFetchActions } from './dataFetchActions';

const arrayReturnTypes = ['getList', 'getMany', 'getManyReference']

export const useDataProvider = <
  TDataProvider extends DataProvider = DataProvider
>():TDataProvider => {
  const dataProvider = ((useContext(DataProviderContext) ||
    defaultDataProvider) as unknown) as TDataProvider;
  
  const logoutIfAccessDenied = useLogoutIfAccessDenied();

  const dataProviderProxy = useMemo(() => {
    return new Proxy(dataProvider, {
      get: (target, name) => {
        if (typeof name === 'symbol' || name === 'then') {
          return
        }
        return (...args) => {
          const type = name.toString();

          if (typeof dataProvider[type] !== 'function') {
            throw new Error(
              `Unknown dataProvider function: ${type}`
            );
          }

          try {
            return dataProvider[type]
              .apply(dataProvider, args)
              .then(response => {
                if (
                  process.env.NODE_ENV !== 'production' &&
                  reactAdminFetchActions.includes(type)
                ) {
                  validateResponseFormat(response, type);
                }
                return response;
              })
              .catch(error => {
                if (process.env.NODE_ENV !== 'production') {
                  console.error(error);
                }
                return logoutIfAccessDenied(error).then(
                  loggedOut => {
                    if (loggedOut)
                      return {
                        data: arrayReturnTypes.includes(
                          type
                        )
                          ? []
                          : {},
                      };
                    throw error;
                  }
                )
              })
          } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(e);
            }
            throw new Error(
              'The dataProvider throw an error. It should return a rejected Promise instead'
            )
          }
        }
      }
    })
  }, [dataProvider, logoutIfAccessDenied]);

  return dataProviderProxy;
}