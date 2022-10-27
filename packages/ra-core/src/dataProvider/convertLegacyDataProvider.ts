import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
} from './dataFetchActions';
import { LegacyDataProvider, DataProvider } from '../types';

const defaultDataProvider = () => Promise.resolve();
defaultDataProvider.create = () => Promise.resolve(null);
defaultDataProvider.delete = () => Promise.resolve(null);
defaultDataProvider.deleteMany = () => Promise.resolve(null);
defaultDataProvider.getList = () => Promise.resolve(null);
defaultDataProvider.getMany = () => Promise.resolve(null);
defaultDataProvider.getManyReference = () => Promise.resolve(null);
defaultDataProvider.getOne = () => Promise.resolve(null);
defaultDataProvider.update = () => Promise.resolve(null);
defaultDataProvider.updateMany = () => Promise.resolve(null);

const fetchMap = {
    create: CREATE,
    delete: DELETE,
    deleteMany: DELETE_MANY,
    getList: GET_LIST,
    getMany: GET_MANY,
    getManyReference: GET_MANY_REFERENCE,
    getOne: GET_ONE,
    update: UPDATE,
    updateMany: UPDATE_MANY,
};

interface ConvertedDataProvider extends DataProvider {
    (type: string, resource: string, params: any): Promise<any>;
}

const convertLegacyDataProvider = (
    legacyDataProvider: LegacyDataProvider
): ConvertedDataProvider => {
    const proxy = new Proxy(defaultDataProvider, {
        get(_, name) {
            return (resource, params) => {
                console.log('==========convertLegacyDataProvider=========');
                console.log('resource, params: ', resource, params);
              console.log('==========convertLegacyDataProvider=========');
              if (Object.keys(fetchMap).includes(name.toString())) {
                const fetchType = fetchMap[name.toString()];
                return legacyDataProvider(fetchType, resource, params)
              }
            };
      },
      apply(_, __, args) {
        return legacyDataProvider.apply(legacyDataProvider, args);
      }
    });
  return proxy;
};

export default convertLegacyDataProvider;
