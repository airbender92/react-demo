import { useRef } from 'react';
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutateOptions,
} from 'react-query';

import { useDataProvider } from './useDataProvider';
import { RaRecord, CreateParams } from '../types';

/**
 * Get a callback to call the dataProvider.create() method, the result and the loading state.
 *
 */
export const useCreate = <
    RecordType extends RaRecord = any,
    MutationError = unknown
>(
    resource?: string,
    params: Partial<CreateParams<Partial<RecordType>>> = {},
  options: UseCreateOptions<RecordType, MutationError> = {},
): UseCreateResult<RecordType, boolean, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const paramsRef = useRef<Partial<CreateParams<Partial<RecordType>>>>(params);

  const mutation = useMutation<
    RecordType,
    MutationError,
    Partial<UseCreateMutateParams<RecordType>>
  >(
    ({
      resource: callTimeResource = resource,
      data: callTimeData = paramsRef.current.data,
      meta: callTimeMeta = paramsRef.current.meta,
    } = {}) =>
      dataProvider
        .create<RecordType>(callTimeResource, {
          data: callTimeData,
          meta: callTimeMeta
        })
        .then(({ data }) => data),
    {
      ...options,
      onSuccess: (
        data: RecordType,
        variables: Partial<UseCreateMutateParams<RecordType>> = {},
        context: unknown
      ) => {
        const { resource: callTimeResource = resource } = variables;
        queryClient.setQueryData(
          [callTimeResource, 'getOne', { id: String(data.id) }],
          data
        );
        if (options.onSuccess) {
          options.onSuccess(data, variables, context)
        }
      }
    }
  );

  const create = (
    callTimeResource: string = resource,
    callTimeParams: Partial<CreateParams<RecordType>> = {},
    createOptions: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseCreateMutateParams<RecordType>>,
      unknown
    > & { returnPromise?: boolean } = {}
  ) => {
    const { returnPromise, ...reactCreateOptions } = createOptions;
    if (returnPromise) {
      return mutation.mutateAsync(
        { resource: callTimeResource, ...callTimeParams },
        createOptions
      )
    }
    mutation.mutate(
      { resource: callTimeResource, ...callTimeParams },
      reactCreateOptions
    )
  };
  return [create, mutation];
};

export interface UseCreateMutateParams<RecordType extends RaRecord = any> {
    resource?: string;
    data?: Partial<RecordType>;
    meta?: any;
}

export type UseCreateOptions<
    RecordType extends RaRecord = any,
    MutationError = unknown
> = UseMutationOptions<
    RecordType,
    MutationError,
    Partial<UseCreateMutateParams<RecordType>>
>;

export type UseCreateResult<
    RecordType extends RaRecord = any,
    TReturnPromise extends boolean = boolean,
    MutationError = unknown
> = [
    (
        resource?: string,
        params?: Partial<CreateParams<Partial<RecordType>>>,
        options?: MutateOptions<
            RecordType,
            MutationError,
            Partial<UseCreateMutateParams<RecordType>>,
            unknown
        > & { returnPromise?: TReturnPromise }
    ) => Promise<TReturnPromise extends true ? RecordType : void>,
    UseMutationResult<
        RecordType,
        MutationError,
        Partial<UseCreateMutateParams<RecordType>>,
        unknown
    >
];
