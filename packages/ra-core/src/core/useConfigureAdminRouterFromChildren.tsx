import * as React from 'react';
import {
  Children,
  Dispatch,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLogout, usePermissions, useAuthState } from '../auth'
import { useSafeSetState } from '../util'
import {
  AdminChildren,
  RenderResourcesFunction,
  ResourceDefinition,
  ResourceProps,
} from '../types';
import { CustomRoutesProps } from './CustomRoutes';
import { useResourceDefinitionContext } from './useResourceDefinitionContext';

/**
 * this hook inspects the CoreAdminRouter children and returns them separated in three groups;
 * - Custom routes without layout
 * - Custom routes with layout
 * - Resources
 * 
 * It also returns a status:
 * - loading: still loading children from a function child
 * - empty: no resources were provided among children
 * - ready: admin is ready to be rendered
 */
export const useConfigureAdminRouterFromChildren = (
  children: AdminChildren
) => {

}
