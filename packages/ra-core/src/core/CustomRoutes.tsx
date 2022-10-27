import { ReactNode } from 'react';

/**
 * This component allows you to provide custom routes to the Admin.
 */
export const CustomRoutes = (props: CustomRoutesProps) => {
  return null;
}

CustomRoutes.raName = 'CustomRoutes';

export type CustomRoutesProps = {
  children: ReactNode;
  noLayout?: boolean;
}