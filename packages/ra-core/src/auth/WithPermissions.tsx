import { Children, ReactElement, ComponentType, createElement} from 'react';
import { Location } from 'react-router-dom';

import warning from '../util/warning'
import { useAuthenticated } from './useAuthenticated'
import usePermissionsOptimized from './usePermissionsOptimized'

export interface WithPermissionsChildrenParams {
  permissions: any;
}

type WithPermissionsChildren = (
  params: WithPermissionsChildrenParams
) => ReactElement;

export interface WithPermissionsProps {
  authParams?: object;
  children?: WithPermissionsChildren;
  component?: ComponentType<any>;
  location?: Location;
  render?: WithPermissionsChildren;
  staticContext?: object;
  [key: string]: any;
}

const isEmptyChildren = children => Children.count(children) === 0;

/**
 * After checking that the user is authenticated,
 * retrieves the user's permissions for a specific context.
 * 
 * useful for Route compontns; used internally by Resource.
 * use it to decorate your custom page components to require
 * a custom role. it will pass the permissions as a prop to your component
 * 
 * you can set additional `authParams` at will if your authProvider requires it
 */
const WithPermissions = (props: WithPermissionsProps) => {
  const {
    authParams,
    children,
    render,
    component,
    staticContext,
    ...rest
  } = props;
  warning(
    (render && children && !isEmptyChildren(children)) ||
    (render && component) ||
    (component && children && !isEmptyChildren(children)),
    'You should only use one of the `component`, `render` and `children` props in <WithPermissions>'
  );

  useAuthenticated(authParams);
  const { permissions } = usePermissionsOptimized(authParams)
  // render even though the usePermissions() call insnt finished
  if (component) {
    return createElement(component, { permissions, ...rest });
  }
  if (render) {
    return render({ permissions, ...rest });
  }
  if (children) {
    return children({ permissions, ...rest })
  }
}

export default WithPermissions as ComponentType<WithPermissionsProps>